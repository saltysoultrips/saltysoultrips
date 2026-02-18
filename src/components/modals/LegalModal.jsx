import React from "react";
import X from "lucide-react/dist/esm/icons/x";
import { motion, AnimatePresence } from "framer-motion";

export default function LegalModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-stone-100">
            <h3 className="text-2xl font-serif font-bold text-stone-800">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-800 prose-p:text-stone-600">
              {content}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
