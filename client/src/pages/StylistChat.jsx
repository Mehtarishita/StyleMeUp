import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const StylistChat = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I am your AI Fashion Stylist. What can I help you find today?', recommendedProducts: [] }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/stylist-chat', {
        conversationId,
        message: userMsg
      });

      const updatedConversation = res.data.data;
      setConversationId(updatedConversation._id);
      setMessages(updatedConversation.messages);
    } catch (error) {
      console.error(error);
      toast.error('Failed to get a response from Stylist.');
      // Remove the optimistic user message if failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setConversationId(null);
    setMessages([{ role: 'assistant', content: 'Hi! I am your AI Fashion Stylist. Let\'s start fresh. What are you looking for?', recommendedProducts: [] }]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', background: 'var(--white)', borderRadius: '16px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', height: '80vh', border: '1px solid var(--border)' }}>
      <SEO title="Chat Stylist" description="Talk to our AI stylist to get personalized outfit recommendations." />
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--lavender-light)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✨</span> AI Stylist
          </h2>
          <small style={{ color: 'var(--muted)' }}>Powered by Gemini</small>
        </div>
        <button onClick={startNewChat} className="btn btn--outline btn--sm">New Chat</button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              
              {/* Bubble */}
            <div style={{
              maxWidth: '75%',
              padding: '12px 18px',
              borderRadius: '16px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
              background: msg.role === 'user' ? 'var(--primary)' : '#fff',
              color: msg.role === 'user' ? '#fff' : 'var(--text)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
              lineHeight: '1.5'
            }}>
              {msg.content}
            </div>

            {/* Recommended Products rendering inline */}
            {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
              <div style={{ marginTop: '15px', display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px', maxWidth: '100%' }}>
                {msg.recommendedProducts.map(product => (
                  <div key={product._id} style={{ minWidth: '150px', maxWidth: '150px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <Link to={`/product/${product._id}`}>
                      <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    </Link>
                    <div style={{ padding: '8px' }}>
                      <h4 style={{ margin: '0 0 5px', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                      <strong style={{ color: 'var(--primary)', fontSize: '13px' }}>₹{product.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            <div style={{ padding: '12px 18px', borderRadius: '16px', borderBottomLeftRadius: '4px', background: '#fff', border: '1px solid var(--border)', display: 'flex', gap: '5px' }}>
              {[0, 1, 2].map((dot) => (
                <motion.span 
                  key={dot}
                  animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }}
                  style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--text)', borderRadius: '50%' }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px', borderTop: '1px solid var(--border)', background: '#fff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., I need a casual outfit for a beach party..."
            style={{ flex: 1, padding: '12px 20px', borderRadius: '999px', border: '1px solid var(--border)', outline: 'none', fontSize: '15px' }}
            disabled={loading}
          />
          <button type="submit" className="btn btn--primary" style={{ borderRadius: '999px', padding: '0 25px' }} disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default StylistChat;
