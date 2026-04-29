import React, { useState } from 'react';
import { Plus, Zap, Eye } from 'lucide-react';
import { formatCurrency, openWhatsApp } from '../utils/helpers';

const BADGE_STYLES = {
  "Chef's Pick": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Premium": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Vegetarian": "bg-green-500/20 text-green-300 border-green-500/30",
  "Signature": "bg-brand-500/20 text-brand-300 border-brand-500/30",
  "House Special": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Must Try": "bg-red-500/20 text-red-300 border-red-500/30",
  "Classic": "bg-stone-500/20 text-stone-300 border-stone-500/30",
};

export default function MenuCard({ item, onAddToCart, onImageClick, onToast }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    onAddToCart(item);
    setAdding(true);
    onToast(`${item.name} added to cart`, 'success');
    setTimeout(() => setAdding(false), 600);
  };

  const handleQuickOrder = () => {
    const msg = `🍽️ *Quick Order — Ember & Oak*\n\n• ${item.name} x1 — ${formatCurrency(item.price)}\n\nPlease confirm my order. Thank you!`;
    openWhatsApp(msg);
  };

  const badgeStyle = item.badge ? BADGE_STYLES[item.badge] || "bg-white/10 text-white/70 border-white/20" : null;

  return (
    <div className={`group relative bg-dark-800 rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-1 card-glow`}>
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          onClick={() => onImageClick(item)}
          loading="lazy"
        />
        {/* Image overlay on hover */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
          onClick={() => onImageClick(item)}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100">
            <Eye size={18} className="text-white" />
          </div>
        </div>

        {/* Badge */}
        {item.badge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${badgeStyle}`}>
            {item.badge}
          </div>
        )}

        {/* Popular dot */}
        {item.popular && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-dark-900/70 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-white/70 font-medium">Popular</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-semibold text-white text-base leading-tight">{item.name}</h3>
          <span className="font-semibold text-brand-400 text-sm whitespace-nowrap mt-0.5">{formatCurrency(item.price)}</span>
        </div>
        <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">{item.description}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
              adding
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/20'
            }`}
          >
            <Plus size={14} className={`transition-transform duration-200 ${adding ? 'rotate-45' : ''}`} />
            {adding ? 'Added!' : 'Add to Cart'}
          </button>
          <button
            onClick={handleQuickOrder}
            title="Quick Order via WhatsApp"
            className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Zap size={14} className="text-white/50 group-hover:text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
