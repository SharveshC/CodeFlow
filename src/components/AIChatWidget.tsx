import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  Loader2,
  ChevronDown,
  Code2,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { askGemini, type GeminiMessage } from '@/lib/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatWidgetProps {
  /** Current code in the editor — passed so the AI has full context */
  currentCode?: string;
  /** Current language selected in the editor */
  currentLanguage?: string;
}

const QUICK_PROMPTS = [
  'Explain this code',
  'Find bugs',
  'Optimize it',
  'Add comments',
];

const AIChatWidget = ({ currentCode, currentLanguage }: AIChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const buildSystemInstruction = () => {
    let sys =
      'You are an expert coding assistant embedded in CodeFlow, an online code editor. ' +
      'Give concise, practical answers with code examples using markdown. ' +
      'Focus on the language and code context the user provides.';
    if (currentLanguage) {
      sys += ` The user is currently writing ${currentLanguage} code.`;
    }
    if (currentCode?.trim()) {
      sys += `\n\nCurrent code in the editor:\n\`\`\`${currentLanguage || ''}\n${currentCode}\n\`\`\``;
    }
    return sys;
  };

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText || isLoading) return;

    setInput('');
    setError(null);

    const newMessage: Message = { role: 'user', text: userText };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Convert messages to GeminiMessage format for history (exclude the latest user msg)
      const history: GeminiMessage[] = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const responseText = await askGemini(
        history,
        userText,
        buildSystemInstruction()
      );

      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
    } catch (err: any) {
      const msg = err.message || 'Something went wrong';
      setError(msg);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: `❌ Error: ${msg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center',
          'rounded-full shadow-lg shadow-primary/30',
          'bg-gradient-to-br from-primary to-accent',
          'text-primary-foreground transition-transform hover:scale-110 active:scale-95'
        )}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'fixed bottom-5 right-5 z-50 flex flex-col rounded-2xl border border-border',
        'bg-card shadow-2xl shadow-black/40 transition-all duration-300',
        isMinimized
          ? 'h-14 w-72'
          : 'h-[540px] w-[360px] sm:w-[420px]'
      )}
    >
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between rounded-t-2xl border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">AI Assistant</span>
          {currentLanguage && !isMinimized && (
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              <Code2 className="h-3 w-3" />
              {currentLanguage}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && !isMinimized && (
            <button
              className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => { setMessages([]); setError(null); }}
              title="Clear chat"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            onClick={() => setIsMinimized((p) => !p)}
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 className="h-3.5 w-3.5" />
            ) : (
              <Minimize2 className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            onClick={() => setIsOpen(false)}
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <>
          <ScrollArea ref={scrollRef} className="flex-1 px-4 py-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Code AI Assistant</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ask me anything about your code. I can see what's in the editor!
                  </p>
                </div>
                {/* Quick prompts */}
                <div className="flex flex-wrap justify-center gap-2">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs hover:bg-secondary hover:border-primary/40 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pb-2">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-xl px-3 py-2.5 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'ml-6 bg-primary text-primary-foreground'
                        : 'mr-6 bg-secondary text-foreground'
                    )}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="m-0 mb-1 last:mb-0">{children}</p>,
                        code: ({ children, className }) => {
                          const isBlock = className?.includes('language-');
                          return isBlock ? (
                            <code className={cn('block w-full overflow-x-auto rounded bg-background/60 p-2 text-xs font-mono', className)}>
                              {children}
                            </code>
                          ) : (
                            <code className="rounded bg-background/60 px-1 py-0.5 text-xs font-mono">
                              {children}
                            </code>
                          );
                        },
                        pre: ({ children }) => (
                          <pre className="my-1.5 overflow-x-auto rounded-lg bg-background/60 p-2 text-xs">
                            {children}
                          </pre>
                        ),
                        ul: ({ children }) => <ul className="ml-4 list-disc space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="ml-4 list-decimal space-y-0.5">{children}</ol>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ))}
                {isLoading && (
                  <div className="mr-6 rounded-xl bg-secondary px-3 py-2.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      Thinking…
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="shrink-0 border-t border-border p-3">
            {error && (
              <div className="mb-2 rounded-lg bg-destructive/10 p-2 text-xs text-destructive">
                {error}
              </div>
            )}
            <div className="flex items-end gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your code… (Enter to send)"
                disabled={isLoading}
                rows={1}
                className="min-h-[38px] flex-1 resize-none text-sm leading-snug"
              />
              <Button
                size="icon"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="h-[38px] w-[38px] shrink-0 rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              Shift+Enter for new line · Powered by Gemini
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatWidget;
