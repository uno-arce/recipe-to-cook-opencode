import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'discover' | 'favorites';
  onViewChange: (view: 'discover' | 'favorites') => void;
  deviceId?: string;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'discover' | 'favorites') => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="px-4 md:px-8 h-16 md:h-20 flex items-center justify-between border-b border-outline-variant bg-white/40 backdrop-blur-md fixed top-0 w-full z-50">
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl md:text-2xl font-black uppercase text-primary font-headline tracking-tight cursor-pointer"
        onClick={() => handleNavClick('discover')}
      >
        Recipe2Cook
      </motion.span>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 items-center font-headline text-xs uppercase tracking-widest font-bold">
        <button 
          className={`${currentView === 'discover' ? 'text-primary' : 'text-primary/60'} hover:text-secondary transition-colors cursor-pointer`}
          onClick={() => handleNavClick('discover')}
        >
          Discover
        </button>
        <button 
          className={`${currentView === 'favorites' ? 'text-primary' : 'text-primary/60'} hover:text-secondary transition-colors cursor-pointer`}
          onClick={() => handleNavClick('favorites')}
        >
          Favorites
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-primary"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-outline-variant md:hidden"
          >
            <div className="flex flex-col p-4 gap-4 font-headline text-sm uppercase tracking-widest font-bold">
              <button 
                className={`text-left py-3 px-4 ${currentView === 'discover' ? 'text-primary bg-surface-container-high' : 'text-primary/60'} hover:text-secondary transition-colors`}
                onClick={() => handleNavClick('discover')}
              >
                Discover
              </button>
              <button 
                className={`text-left py-3 px-4 ${currentView === 'favorites' ? 'text-primary bg-surface-container-high' : 'text-primary/60'} hover:text-secondary transition-colors`}
                onClick={() => handleNavClick('favorites')}
              >
                Favorites
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}