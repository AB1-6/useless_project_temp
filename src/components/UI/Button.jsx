import React from 'react';
import { soundService } from '../../services/soundService';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  sound = 'click',
  icon: Icon,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (sound === 'click') soundService.playClick();
    else if (sound === 'select') soundService.playSelect();
    else if (sound === 'quest') soundService.playQuestChime();
    else if (sound === 'wind') soundService.playWind();

    if (onClick) onClick(e);
  };

  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 rounded-xl relative overflow-hidden select-none disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3"
  };

  const variantStyles = {
    primary: "btn-game-primary text-slate-950",
    amber: "btn-game-amber text-slate-950",
    secondary: "btn-game-secondary text-slate-200 hover:text-white",
    danger: "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-rose-400/40",
    purple: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40",
    ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white border border-transparent",
    retro: "bg-amber-400 hover:bg-amber-300 text-slate-950 font-retro text-xs border-2 border-amber-200 shadow-[3px_3px_0px_#78350f]"
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
    </button>
  );
}
