import { motion } from 'motion/react';

interface NavbarProps {
  currentView: 'discover' | 'favorites';
  onViewChange: (view: 'discover' | 'favorites') => void;
  deviceId?: string;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  return (
    <nav className="px-8 h-20 flex items-center justify-between border-b border-outline-variant bg-white/40 backdrop-blur-md fixed top-0 w-full z-50">
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-black uppercase text-primary font-headline tracking-tight cursor-pointer"
        onClick={() => onViewChange('discover')}
      >
        ReciPal
      </motion.span>
      <div className="flex gap-8 items-center font-headline text-xs uppercase tracking-widest font-bold">
        <button 
          className={`${currentView === 'discover' ? 'text-primary' : 'text-primary/60'} hover:text-secondary transition-colors cursor-pointer`}
          onClick={() => onViewChange('discover')}
        >
          Discover
        </button>
        <button 
          className={`${currentView === 'favorites' ? 'text-primary' : 'text-primary/60'} hover:text-secondary transition-colors cursor-pointer`}
          onClick={() => onViewChange('favorites')}
        >
          Favorites
        </button>
      </div>
    </nav>
  );
}
