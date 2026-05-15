'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const beaconColors = [0x22d3ee, 0xf97316, 0xa3e635, 0xfacc15, 0x38bdf8]

export default function TravelGlobe3D() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.4, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const root = new THREE.Group()
    scene.add(root)

    const globeGeometry = new THREE.SphereGeometry(1.72, 64, 64)
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      metalness: 0.18,
      roughness: 0.42,
      transparent: true,
      opacity: 0.82,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    root.add(globe)

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.745, 28, 18)),
      new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.28 }),
    )
    root.add(wireframe)

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.95, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      }),
    )
    root.add(atmosphere)

    const routes = new THREE.Group()
    const routeMaterial = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.62 })
    const routeSets = [
      [-1.6, -0.25, 1.55, 0.58, 0.18],
      [-1.1, 1.15, 1.25, -0.92, -0.22],
      [-0.2, -1.55, 1.38, 1.1, 0.28],
    ]

    routeSets.forEach(([x1, y1, x2, y2, z]) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x1, y1, z),
        new THREE.Vector3((x1 + x2) / 2, (y1 + y2) / 2 + 0.85, z + 1.05),
        new THREE.Vector3(x2, y2, z),
      ])
      const points = curve.getPoints(72)
      routes.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), routeMaterial))
    })
    root.add(routes)

    const beacons = new THREE.Group()
    const beaconPositions = [
      [-0.95, 0.86, 1.18],
      [1.1, 0.32, 1.24],
      [0.28, -1.2, 1.13],
      [-1.35, -0.5, 0.9],
      [0.02, 1.48, 0.75],
    ]

    beaconPositions.forEach((position, index) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 24, 24),
        new THREE.MeshBasicMaterial({ color: beaconColors[index % beaconColors.length] }),
      )
      marker.position.set(position[0], position[1], position[2])
      beacons.add(marker)

      const pulse = new THREE.Mesh(
        new THREE.RingGeometry(0.1, 0.18, 32),
        new THREE.MeshBasicMaterial({
          color: beaconColors[index % beaconColors.length],
          transparent: true,
          opacity: 0.34,
          side: THREE.DoubleSide,
        }),
      )
      pulse.position.copy(marker.position)
      pulse.lookAt(camera.position)
      beacons.add(pulse)
    })
    root.add(beacons)

    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(260 * 3)
    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 9
      starPositions[i + 1] = (Math.random() - 0.5) * 5.5
      starPositions[i + 2] = -Math.random() * 4 - 1
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.55 }),
    )
    scene.add(stars)

    scene.add(new THREE.AmbientLight(0xffffff, 1.1))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0xf97316, 3.4, 10)
    rimLight.position.set(-3, -1, 3)
    scene.add(rimLight)

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      root.rotation.y = elapsed * 0.18
      root.rotation.x = Math.sin(elapsed * 0.35) * 0.08
      routes.rotation.y = elapsed * 0.04
      stars.rotation.y = elapsed * 0.015
      beacons.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          const scale = 1 + Math.sin(elapsed * 2.4 + index) * 0.18
          child.scale.setScalar(scale)
          child.lookAt(camera.position)
        }
      })
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      globeGeometry.dispose()
      globeMaterial.dispose()
      wireframe.geometry.dispose()
      atmosphere.geometry.dispose()
      starGeometry.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
}
