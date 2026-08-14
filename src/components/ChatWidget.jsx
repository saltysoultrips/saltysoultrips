import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input || !input.trim()) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      
      setMessages([...newMessages, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: text.replace(/^0:"/, '').replace(/"$/,'').replace(/\\n/g, '\n')
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  // Bloquea el scroll del body cuando el chat está abierto en móvil para evitar que la pantalla salte
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 sm:top-auto sm:bottom-24 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-[100] overflow-hidden"
            style={{ height: 'max-content', maxHeight: '60vh' }}
          >
            {/* Header */}
            <div className="bg-[#1F2937] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xl">🌊</span>
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Salty</h3>
                  <p className="text-xs text-gray-300">Responde al instante</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 relative scroll-smooth h-[300px] sm:h-[400px]">
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-2xl text-sm shadow-sm bg-white border border-gray-100 text-gray-800 rounded-tl-sm">
                  ¡Hola! Soy tu asistente de SaltySoulTrips 🌊. ¿En qué te puedo ayudar hoy? ¿Buscas algún destino en concreto?
                </div>
              </div>
              
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-[#1F2937] text-white rounded-tr-sm'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </span>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="text-red-500 text-xs text-center p-2">
                  Error: {error.message}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={onSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center pb-safe">
              <input
                className="flex-1 px-4 py-3 sm:py-2 bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 rounded-full text-sm outline-none transition-all"
                value={input}
                placeholder="Escribe tu mensaje..."
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="p-3 sm:p-2.5 bg-[#1F2937] hover:bg-black text-white rounded-full transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-[#1F2937] hover:bg-black text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-[60]"
        aria-label="Abrir asistente de viajes"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
}
