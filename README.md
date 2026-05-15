# Smart Travel Website - TravelAI

An AI-powered smart travel platform built with Next.js, React, TypeScript, Tailwind CSS, Firebase, and Framer Motion.

## 🌟 Features

- **Destination Explorer** - Search and filter destinations by category, rating, and budget
- **AI Trip Planner** - Let AI create personalized itineraries based on your preferences
- **Hotel Booking** - Browse and book hotels with advanced filtering
- **Budget Calculator** - Get accurate cost estimates for your trips
- **User Authentication** - Email/password and social login with Firebase
- **Trip Management** - Manage your upcoming and past trips
- **AI Travel Assistant** - Chat with AI for travel recommendations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Glassmorphism, smooth animations, and premium aesthetics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project (free tier available at [firebase.google.com](https://firebase.google.com))

### Installation

1. **Clone or extract the project**
   ```bash
   cd smart-travel-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Create a web app in your Firebase project
   - Copy your Firebase config credentials
   - Update `.env.local` with your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
smart-travel-website/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── explore/             # Destination explorer
│   ├── hotels/              # Hotel booking
│   ├── budget/              # Budget calculator
│   ├── ai-planner/          # AI itinerary planner
│   ├── trips/               # Trip management
│   ├── auth/                # Authentication pages
│   └── globals.css          # Global styles
├── components/               # React components
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer
│   ├── DestinationCard.tsx  # Destination card
│   ├── HotelCard.tsx        # Hotel card
│   └── AITravelChat.tsx     # AI chat interface
├── lib/                      # Utilities and services
│   ├── firebase.ts          # Firebase configuration
│   ├── apiClient.ts         # API client
│   ├── travelService.ts     # Travel logic
│   └── mockData.ts          # Mock data for demo
├── store/                    # Zustand state management
│   └── index.ts             # Auth, search, cart stores
├── types/                    # TypeScript types
│   └── index.ts             # Type definitions
├── public/                   # Static assets
├── .env.local               # Environment variables (add your Firebase config)
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind CSS config
├── next.config.js           # Next.js config
└── package.json             # Dependencies

```

## 🔧 Tech Stack

**Frontend:**
- Next.js 14 - React framework
- React 18 - UI library
- TypeScript - Type safety
- Tailwind CSS - Styling
- Framer Motion - Animations
- Zustand - State management
- React Icons - Icon library
- Lucide React - UI icons

**Backend & Services:**
- Firebase - Authentication, Firestore, Storage
- Axios - HTTP client
- Node.js (for future backend)

**Build & Dev:**
- ESLint - Code linting
- Prettier - Code formatting
- PostCSS - CSS processing

## 📖 Usage

### Homepage
- View trending destinations
- Search for destinations
- Chat with AI travel assistant
- Access all main features

### Explore Destinations
- Browse all destinations with filters
- Filter by category (Beach, Mountains, Adventure, etc.)
- Search by name or country
- Click to view detailed destination info

### Budget Calculator
- Select destination
- Set number of travelers and duration
- Choose budget vs luxury mode
- Get detailed cost breakdown

### Hotel Booking
- Search hotels by destination
- Filter by price, rating
- View hotel details and amenities
- Book and process payment

### AI Trip Planner
- Provide trip details (destination, days, budget)
- AI generates day-wise itinerary
- View recommendations and cost breakdown
- Download or share itinerary

### Trip Management
- View upcoming trips
- Track trip progress
- Access past trips
- Manage bookings and reservations

## 🔐 Authentication

The platform supports:
- Email/Password registration and login
- Google OAuth (configure in Firebase)
- GitHub OAuth (configure in Firebase)
- Session persistence with localStorage

### Setting up OAuth:

1. **Google OAuth:**
   - Enable Google sign-in in Firebase Console
   - Add authorized JavaScript origins

2. **GitHub OAuth:**
   - Create OAuth app on GitHub
   - Add credentials to Firebase Console

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: { ... },    // Main brand color
  accent: { ... },     // Accent color
  warm: '#ff8c42',     // CTA button color
}
```

### Fonts
Available fonts:
- Inter (body text)
- Poppins (headings)
- SF Pro (fallback)

### Animations
All animations use Framer Motion. Customize in component files or global animations in `globals.css`.

## 📱 Responsive Design

- **Mobile** - Optimized for 320px+
- **Tablet** - Optimized for 768px+
- **Desktop** - Optimized for 1024px+

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t travel-ai .
docker run -p 3000:3000 travel-ai
```

## 📊 API Integration

Replace mock data with real APIs:

1. **Destinations API** - Connect to travel data providers
2. **Hotels API** - Integrate Booking.com, Expedia, or Agoda APIs
3. **Flights API** - Add flight search (Skyscanner, Amadeus)
4. **Maps API** - Enable Google Maps integration
5. **AI Chat** - Connect to OpenAI or similar LLM

Update endpoints in `lib/apiClient.ts`

## 🔄 Future Enhancements

- [ ] Real hotel and flight booking integration
- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Advanced AI with OpenAI API
- [ ] Email notifications
- [ ] User reviews and ratings
- [ ] Social sharing
- [ ] Group trip planning
- [ ] Wishlist functionality
- [ ] Travel insurance integration
- [ ] Multi-language support

## 🐛 Troubleshooting

**Firebase Connection Issues:**
- Verify `.env.local` has correct credentials
- Check Firebase project is active
- Enable required services in Firebase Console

**Build Errors:**
```bash
npm install --legacy-peer-deps
npm run build
```

**Development Server Won't Start:**
```bash
rm -rf .next
npm run dev
```

## 📝 Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_OPENAI_API_KEY=
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For support, open an issue or contact the development team.

## 🎯 Roadmap

- Q1 2024: MVP launch with core features
- Q2 2024: Advanced AI integration
- Q3 2024: Mobile app release
- Q4 2024: Enterprise features

---

Built with ❤️ for travelers worldwide
