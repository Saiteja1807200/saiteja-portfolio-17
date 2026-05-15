import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'portfolio_chat_history_v1';

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm Saiteja's portfolio assistant. Ask me about his projects, skills, education, or how to get in touch.",
};

const SUGGESTIONS = [
  'What projects has he built?',
  'What are his strongest skills?',
  'How do I contact Saiteja?',
];

const PortfolioChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [WELCOME];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [WELCOME];
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('portfolio-chat', {
        body: { messages: next.filter((m) => m.role !== 'assistant' || m !== WELCOME).slice(-20) },
      });

      if (error) throw error;
      const reply = (data as { reply?: string; error?: string })?.reply
        ?? (data as { error?: string })?.error
        ?? "Sorry, something went wrong.";
      setMessages((curr) => [...curr, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('chat error', err);
      setMessages((curr) => [
        ...curr,
        { role: 'assistant', content: "Hmm, I couldn't reach the assistant. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME]);
  };

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full',
          'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
          'flex items-center justify-center',
          'hover:scale-110 transition-transform'
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'fixed z-[59] bg-background border border-border/60 shadow-2xl',
              'flex flex-col overflow-hidden',
              // Mobile: nearly full screen
              'inset-x-3 bottom-24 top-20 rounded-2xl',
              // Desktop: floating panel
              'sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:left-auto sm:w-[400px] sm:h-[600px] sm:max-h-[80vh]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm leading-tight truncate">Ask about Saiteja</p>
                  <p className="text-xs text-muted-foreground leading-tight">Powered by AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={clearChat}
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.role === 'user' ? (
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="max-w-[90%] text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 px-2 py-2">
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                </div>
              )}

              {/* Suggestions when only welcome message */}
              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-muted-foreground px-1">Try asking:</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border/60 hover:bg-primary/5 hover:border-primary/40 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border/60 p-3 bg-background"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask anything about Saiteja..."
                  className={cn(
                    'flex-1 resize-none rounded-xl border border-input bg-background',
                    'px-3 py-2.5 text-sm leading-snug',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'max-h-32'
                  )}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 rounded-xl shrink-0"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioChatbot;
