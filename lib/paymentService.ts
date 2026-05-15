import axios from 'axios'

// Stripe Payment Service
export class StripeService {
  private stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  async createPaymentIntent(amount: number, currency = 'usd', metadata?: Record<string, any>) {
    try {
      const response = await axios.post('/api/payments/create-intent', {
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata,
      })
      return response.data
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw error
    }
  }

  async confirmPayment(clientSecret: string, paymentMethodId: string) {
    try {
      const response = await axios.post('/api/payments/confirm', {
        clientSecret,
        paymentMethodId,
      })
      return response.data
    } catch (error) {
      console.error('Error confirming payment:', error)
      throw error
    }
  }

  async getPaymentStatus(paymentIntentId: string) {
    try {
      const response = await axios.get(`/api/payments/status/${paymentIntentId}`)
      return response.data
    } catch (error) {
      console.error('Error getting payment status:', error)
      throw error
    }
  }

  async refundPayment(paymentIntentId: string, amount?: number) {
    try {
      const response = await axios.post('/api/payments/refund', {
        paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
      })
      return response.data
    } catch (error) {
      console.error('Error refunding payment:', error)
      throw error
    }
  }
}

// Razorpay Payment Service
export class RazorpayService {
  private razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  async createOrder(amount: number, currency = 'INR', notes?: Record<string, any>) {
    try {
      const response = await axios.post('/api/razorpay/create-order', {
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency,
        notes,
      })
      return response.data
    } catch (error) {
      console.error('Error creating Razorpay order:', error)
      throw error
    }
  }

  async verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) {
    try {
      const response = await axios.post('/api/razorpay/verify', {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      })
      return response.data
    } catch (error) {
      console.error('Error verifying Razorpay payment:', error)
      throw error
    }
  }

  async getPaymentDetails(paymentId: string) {
    try {
      const response = await axios.get(`/api/razorpay/payment/${paymentId}`)
      return response.data
    } catch (error) {
      console.error('Error getting Razorpay payment details:', error)
      throw error
    }
  }

  async refundPayment(paymentId: string, amount?: number, notes?: Record<string, any>) {
    try {
      const response = await axios.post('/api/razorpay/refund', {
        paymentId,
        amount: amount ? Math.round(amount * 100) : undefined,
        notes,
      })
      return response.data
    } catch (error) {
      console.error('Error refunding Razorpay payment:', error)
      throw error
    }
  }
}

// Payment Handler - Choose between Stripe or Razorpay
export class PaymentHandler {
  private stripe: StripeService | null = null
  private razorpay: RazorpayService | null = null

  constructor(provider: 'stripe' | 'razorpay' = 'stripe') {
    if (provider === 'stripe') {
      this.stripe = new StripeService()
    } else if (provider === 'razorpay') {
      this.razorpay = new RazorpayService()
    }
  }

  async processPayment(data: {
    amount: number
    currency?: string
    description?: string
    email?: string
    orderId?: string
    metadata?: Record<string, any>
  }) {
    if (this.stripe) {
      return await this.stripe.createPaymentIntent(
        data.amount,
        data.currency,
        {
          ...data.metadata,
          description: data.description,
          email: data.email,
          orderId: data.orderId,
        }
      )
    } else if (this.razorpay) {
      return await this.razorpay.createOrder(
        data.amount,
        data.currency,
        {
          ...data.metadata,
          description: data.description,
          email: data.email,
          orderId: data.orderId,
        }
      )
    }
  }

  async refund(paymentId: string, amount?: number, notes?: Record<string, any>) {
    if (this.stripe) {
      return await this.stripe.refundPayment(paymentId, amount)
    } else if (this.razorpay) {
      return await this.razorpay.refundPayment(paymentId, amount, notes)
    }
  }
}

export const stripeService = new StripeService()
export const razorpayService = new RazorpayService()
