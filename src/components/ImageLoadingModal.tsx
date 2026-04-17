import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ImageLoadingModalProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
}

export default function ImageLoadingModal({ isOpen, currentStep, totalSteps }: ImageLoadingModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-surface p-12 rounded-lg shadow-2xl max-w-md w-full mx-4 border-2 border-secondary"
      >
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-16 h-16 animate-spin text-secondary" />
          
          <div className="text-center">
            <h3 className="font-headline text-2xl font-black uppercase text-primary mb-2">
              Regenerating Images
            </h3>
            <p className="font-body text-on-surface-variant">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="font-headline text-xs uppercase tracking-widest text-on-surface-variant/70">
            Please wait...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
