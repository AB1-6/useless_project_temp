import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import GlassCard from './GlassCard';
import { soundService } from '../../services/soundService';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl'
}) {
  useEffect(() => {
    if (isOpen) {
      soundService.playSelect();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={`relative w-full ${maxWidth} z-10 animate-pop`}>
        <GlassCard glow glowColor="amber" className="border-amber-500/30 p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-wide">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-slate-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {onClose && (
              <button
                onClick={() => {
                  soundService.playClick();
                  onClose();
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div>
            {children}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
