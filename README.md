## App Context
I decided to learn opencode for agentic coding experience and I come across this idea of building a food app. The main idea is to combine text generation and image diffusion to produce a visual guide on the step-by-step instructions of the food recipes. The frontend UI is made from google stitch, send the design context and html code to google studio and let it build the static frontend, then exported it to opencode to build its server and frontend features.

## Key Functionalities
**App Functionalities**
- AI-Powered Recipe Generation using Pollinations API (text)
- Image Generation using Cloudflare AI Workers (stable diffusion)
- Stateless Session Storage using Zustand
- Device-based Favorites with Local Preferences
- Recipe Search and Collection Browsing

**Accessibility Functionalities**
- Skeleton Loading States
- Image Generation Progress Modal
- Responsive Design with Motion Animations
- Form Progress Indicators

## What's Inside
**Dependencies**
| Package | Purpose |
| --- | --- |
| `vite` | Development Server & Build Tool |
| `react` | UI Framework |
| `motion` | Animation Library |
| `tailwindCSS` | Utility First Styling |
| `Zustand` | State Management |
| `lucide-react` | Icon Library |
| `axios` | HTTP Client |

**Folder Structure**
```
src/
├── assets         # Images 
├── components     # Reusable and standalone components
├── data           # Static data and types
├── stores         # Zustand state management
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
```
