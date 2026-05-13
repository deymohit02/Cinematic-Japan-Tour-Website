# 🌸 Cinematic Japan Tour Landing

A high-fidelity, production-grade landing page designed to provide a "cinematic" storytelling experience for a luxury 10-day tour of Japan. This project focuses on high-end aesthetics, smooth motion design, and emotional engagement.

![Cinematic Japan Preview](https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2070)

---

## ✨ Key Features

- **🎬 Cinematic Scroll Experience:** Custom-built scroll hijacking using [Lenis](https://github.com/darkroomengineering/lenis) for silky-smooth, momentum-based navigation.
- **🏔️ Multi-Layer Parallax Hero:** A deep, 3D-effect hero section using layered images (mountains, typography, subjects) moving at different speeds.
- **🌸 Dynamic Sakura System:** A performance-optimized cherry blossom petal system that creates an ambient atmospheric layer across the site.
- **🗺️ Interactive Itinerary:** A scroll-triggered vertical timeline that "grows" as the user explores the journey from Osaka to Tokyo.
- **📸 Polaroid Video Gallery:** Interactive media cards that transition from grayscale to color and play video on hover.
- **🎯 Custom Liquid Cursor:** A responsive, lag-free custom cursor that interacts with UI elements for a premium feel.
- **📱 Responsive Editorial Design:** Fully optimized for all screen sizes, from mobile devices to ultra-wide monitors.

---

## 🛠️ Technology Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Components** | [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Structure

```text
app/
├── public/                 # Static videos and high-res images
├── src/
│   ├── components/         # Reusable interactive components
│   │   ├── SakuraPetals.tsx# Particle system logic
│   │   └── CustomCursor.tsx# Liquid mouse tracking
│   ├── sections/           # Major page blocks (Hero, About, Contact)
│   ├── lib/                # Utility functions and class merging
│   ├── App.tsx             # Main layout and scroll orchestration
│   └── index.css           # Global design tokens and typography
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- npm or yarn

### Installation
1. Clone the repository or extract the ZIP.
2. Navigate to the `app` directory:
   ```bash
   cd app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server with HMR (Hot Module Replacement):
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🗺️ Roadmap & Next Steps

- [ ] **Email Integration:** Connect the Contact Form to a backend service (Resend/SendGrid).
- [ ] **Booking Engine:** Add a date selection calendar for real-time tour booking.
- [ ] **SEO Optimization:** Implement Next.js-style meta tags for better search engine visibility.
- [ ] **i18n Support:** Add Japanese language localization.

---

## 📜 License

This project is for demonstration and portfolio purposes. All assets used (images/videos) are for representational use.
