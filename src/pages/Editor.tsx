import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Save, ChevronLeft, Plus, Loader2, Trash2, Home, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import EditorComponent from '@/components/EditorComponent';
import { useAutoSave } from '@/hooks/useAutoSave';

// Define the Snippet interface
interface Snippet {
  id?: string;
  title: string;
  content: string;
  language: string;
  userId: string;
  createdAt?: any;
  updatedAt?: any;
}

// Language options
const languageOptions = [
  { value: 'javascript', label: 'JavaScript (Node.js)' },
  { value: 'python', label: 'Python 3.8.1' },
  { value: 'java', label: 'Java (OpenJDK 13.0.1)' },
  { value: 'c', label: 'C (GCC 9.2.0)' },
  { value: 'cpp', label: 'C++ (GCC 9.2.0)' },
  { value: 'csharp', label: 'C# (Mono 6.6.0)' },
  { value: 'go', label: 'Go 1.13.5' },
  { value: 'ruby', label: 'Ruby 2.7.0' },
  { value: 'php', label: 'PHP 7.4.1' },
  { value: 'bash', label: 'Bash 5.0.0' },
];

// Supported language types
type Language = 'javascript' | 'python' | 'java' | 'c' | 'cpp' | 'csharp' | 'go' | 'ruby' | 'php' | 'bash';

// Default code templates
const defaultCode: Record<Language, string> = {
  javascript: '// JavaScript (Node.js) Example\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet("World"));',

  python: '# Python 3.8.1 Example\ndef greet(name):\n    return f"Hello, {name}!"\nprint(greet("World"))',

  java: '// Java (OpenJDK 13.0.1) Example\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(greet("World"));\n    }\n    \n    public static String greet(String name) {\n        return "Hello, " + name + "!";\n    }\n}',

  c: '// C (GCC 9.2.0) Example\n#include <stdio.h>\n\nvoid greet(const char* name) {\n    printf("Hello, %s!\\n", name);\n}\n\nint main() {\n    greet("World");\n    return 0;\n}',

  cpp: '// C++ (GCC 9.2.0) Example\n#include <iostream>\n#include <string>\n\nvoid greet(const std::string& name) {\n    std::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main() {\n    greet("World");\n    return 0;\n}',

  csharp: '// C# (Mono 6.6.0) Example\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(Greet("World"));\n    }\n    \n    static string Greet(string name) {\n        return $"Hello, {name}!";\n    }\n}',

  go: '// Go 1.13.5 Example\npackage main\n\nimport "fmt"\n\nfunc greet(name string) string {\n    return fmt.Sprintf("Hello, %s!", name)\n}\n\nfunc main() {\n    fmt.Println(greet("World"))\n}',

  ruby: '# Ruby 2.7.0 Example\ndef greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet("World")',

  php: '<?php\n// PHP 7.4.1 Example\nfunction greet($name) {\n    return "Hello, $name!";\n}\n\necho greet("World");\n?>',

  bash: '#!/bin/bash\n# Bash 5.0.0 Example\ngreet() {\n    echo "Hello, $1!"\n}\n\ngreet "World"'
};

const editorThemeOptions = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'vs-light', label: 'Light' },
  { value: 'hc-black', label: 'High Contrast' },
];

// Snippet List Component
function SnippetList({
  snippets,
  onSelectSnippet,
  onDeleteSnippet,
  selectedSnippetId,
  isLoading
}: {
  snippets: Snippet[];
  onSelectSnippet: (snippet: Snippet) => void;
  onDeleteSnippet: (id: string) => void;
  selectedSnippetId: string | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No snippets found. Create a new one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedSnippetId === snippet.id ? 'bg-accent' : 'hover:bg-muted'
            }`}
        >
          <div
            className="flex-1 truncate"
            onClick={() => onSelectSnippet(snippet)}
          >
            <div className="font-medium truncate">{snippet.title}</div>
            <div className="text-xs text-muted-foreground truncate">
              {snippet.language} • {snippet.updatedAt?.toDate ?
                new Date(snippet.updatedAt.toDate()).toLocaleString() :
                new Date().toLocaleString()}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              if (snippet.id) onDeleteSnippet(snippet.id);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
}

// Output Console Component
function OutputConsole({
  output,
  isRunning,
  isError,
  executionTime,
}: {
  output: string;
  isRunning: boolean;
  isError: boolean;
  executionTime?: number;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b px-4 py-2 font-medium">Output</div>
      <div className="flex-1 p-4 overflow-auto bg-black text-white font-mono text-sm">
        {isRunning ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Running...</span>
          </div>
        ) : (
          <pre className={`whitespace-pre-wrap ${isError ? 'text-red-400' : 'text-green-400'}`}>
            {output || 'Click "Run" to execute your code'}
          </pre>
        )}
        {executionTime !== undefined && (
          <div className="text-gray-400 text-xs mt-2">
            Execution time: {executionTime}ms
          </div>
        )}
      </div>
    </div>
  );
}

// Main Editor Component
export default function EditorPage() {
  // State
  const [code, setCode] = useState<string>(defaultCode.javascript);
  const [language, setLanguage] = useState<string>('javascript');
  const [output, setOutput] = useState<string>('');
  const [executionTime, setExecutionTime] = useState<number | undefined>();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState<boolean>(true);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
  const [snippetTitle, setSnippetTitle] = useState<string>('');
  const [currentSnippetTitle, setCurrentSnippetTitle] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [editorFontSize, setEditorFontSize] = useState<number>(14);
  const [editorTheme, setEditorTheme] = useState<string>('vs-dark');
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved' | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(true);
  const [selectedSnippetLoading, setSelectedSnippetLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch snippets when user changes
  const fetchSnippets = useCallback(async () => {
    if (!currentUser) {
      setSnippets([]);
      return;
    }

    try {
      setIsLoadingSnippets(true);
      const snippetsRef = collection(db, 'snippets');
      const q = query(
        snippetsRef,
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const snippetsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Snippet[];

      // Sort in JavaScript to avoid needing a composite index
      snippetsData.sort((a, b) => {
        const aTime = a.updatedAt?.toMillis?.() || a.createdAt?.toMillis?.() || 0;
        const bTime = b.updatedAt?.toMillis?.() || b.createdAt?.toMillis?.() || 0;
        return bTime - aTime; // desc order
      });

      setSnippets(snippetsData);
    } catch (error) {
      console.error('Error fetching snippets:', error);
      toast({
        title: 'Error',
        description: 'Failed to load snippets',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingSnippets(false);
    }
  }, [currentUser, toast]);

  // Reset editor state when auth changes and load snippets for the signed-in user
  useEffect(() => {
    if (!currentUser) {
      setSnippets([]);
      setSelectedSnippetId(null);
      setCurrentSnippetTitle('');
      setSnippetTitle('');
      setAutoSaveStatus(null);
      setSelectedSnippetLoading(false);
      setCode(defaultCode[language] || '');
      setOutput('');
      return;
    }

    fetchSnippets();
  }, [currentUser, fetchSnippets, language]);

  // Handle code changes
  const handleCodeChange = useCallback((value: string | undefined) => {
    setCode(value || '');
    // Mark as unsaved when code changes
    if (selectedSnippetId || currentSnippetTitle.trim()) {
      setAutoSaveStatus('unsaved');
    }
  }, [selectedSnippetId, currentSnippetTitle]);

  // Handle run button click
  const handleRun = useCallback(async () => {
    if (!code || code.trim() === '') {
      toast({
        title: 'Validation Error',
        description: 'Cannot execute empty code',
        variant: 'destructive',
      });
      return;
    }

    setIsRunning(true);
    setOutput('');
    setIsError(false);
    setExecutionTime(undefined);

    try {
      const startTime = performance.now();
      // Simulate code execution (replace with actual execution logic)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = {
        output: 'Hello, World!',
        error: null,
      };
      const endTime = performance.now();

      setOutput(result.output);
      setExecutionTime(Math.round(endTime - startTime));
      setIsError(!!result.error);
    } catch (error: any) {
      setIsError(true);
      setOutput(error.message || 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [code, toast]);

  // Handle save button click
  const doSave = useCallback(async (title: string, showToast = true, isAutoSave = false) => {
    if (!currentUser) {
      if (showToast) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to save snippets',
          variant: 'destructive',
        });
      }
      return;
    }

    if (isAutoSave) {
      setAutoSaveStatus('saving');
    } else {
      setIsSaving(true);
    }

    try {
      const snippetData = {
        title,
        content: code,
        language,
        userId: currentUser.uid,
        updatedAt: serverTimestamp(),
      };

      if (selectedSnippetId) {
        const snippetRef = doc(db, 'snippets', selectedSnippetId);
        await updateDoc(snippetRef, snippetData);

        // Optimistically update local snippets list
        setSnippets(prev => prev.map(s =>
          s.id === selectedSnippetId
            ? { ...s, ...snippetData, title, content: code, language }
            : s
        ));

        if (showToast) {
          toast({
            title: 'Success',
            description: 'Snippet updated successfully',
          });
        }
      } else {
        const docRef = await addDoc(collection(db, 'snippets'), {
          ...snippetData,
          createdAt: serverTimestamp(),
        });
        setSelectedSnippetId(docRef.id);

        // Optimistically add to local snippets list
        setSnippets(prev => [{
          id: docRef.id,
          title,
          content: code,
          language,
          userId: currentUser.uid,
        } as Snippet, ...prev]);

        if (showToast) {
          toast({
            title: 'Success',
            description: 'Snippet saved successfully',
          });
        }
        setCurrentSnippetTitle(title);
      }

      if (isAutoSave) {
        setAutoSaveStatus('saved');
        // Reset status after 2 seconds
        setTimeout(() => setAutoSaveStatus(null), 2000);
      }

      // Refresh snippets list in background (non-blocking)
      fetchSnippets().catch(err => console.error('Background fetch failed:', err));
    } catch (error) {
      console.error('Error saving snippet:', error);
      if (isAutoSave) {
        setAutoSaveStatus('unsaved');
      } else if (showToast) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to save snippet',
          variant: 'destructive',
        });
      }
    } finally {
      if (!isAutoSave) {
        setIsSaving(false);
      }
    }
  }, [code, currentUser, fetchSnippets, language, selectedSnippetId, toast]);

  const handleSave = useCallback(() => {
    if (!currentUser) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to save snippets',
        variant: 'destructive',
      });
      return;
    }

    if (!currentSnippetTitle.trim()) {
      setSnippetTitle(currentSnippetTitle);
      setSaveDialogOpen(true);
      return;
    }

    doSave(currentSnippetTitle.trim());
  }, [currentSnippetTitle, currentUser, doSave, toast]);

  const handleDialogSave = async () => {
    if (!snippetTitle.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for this snippet',
        variant: 'destructive',
      });
      return;
    }

    setSaveDialogOpen(false);
    setCurrentSnippetTitle(snippetTitle.trim());
    await doSave(snippetTitle.trim());
    setSnippetTitle('');
  };

  // Auto-save functionality
  const autoSaveHandler = useCallback(async () => {
    // Only auto-save if there's a selected snippet or a title
    if (!currentUser || (!selectedSnippetId && !currentSnippetTitle.trim())) {
      return;
    }

    const titleToUse = currentSnippetTitle.trim() || 'Untitled';
    await doSave(titleToUse, false, true);
  }, [currentUser, selectedSnippetId, currentSnippetTitle, doSave]);

  const { debouncedSave } = useAutoSave({
    onSave: autoSaveHandler,
    delay: 2000, // Auto-save 2 seconds after last change
    enabled: autoSaveEnabled && !!currentUser && (!!selectedSnippetId || !!currentSnippetTitle.trim()),
  });

  // Trigger auto-save when code, language, or title changes
  useEffect(() => {
    if (autoSaveEnabled && currentUser && (selectedSnippetId || currentSnippetTitle.trim())) {
      debouncedSave();
    }
  }, [code, language, currentSnippetTitle, selectedSnippetId, currentUser, debouncedSave, autoSaveEnabled]);

  // Handle new snippet creation
  const handleNewSnippet = useCallback(() => {
    setSelectedSnippetId(null);
    setCurrentSnippetTitle('');
    setSnippetTitle('');
    setCode(defaultCode[language] || '');
    setOutput('');
    setIsError(false);
    setExecutionTime(undefined);
    setAutoSaveStatus(null);
  }, [language]);

  // Handle snippet selection
  const handleSelectSnippet = useCallback(async (snippet: Snippet) => {
    if (!snippet.id) return;

    setSelectedSnippetId(snippet.id);
    setCurrentSnippetTitle(snippet.title);
    setCode(snippet.content);
    setLanguage(snippet.language);
    setOutput('');
    setIsError(false);
    setAutoSaveStatus(null); // Reset status when loading a saved snippet

    setSelectedSnippetLoading(true);
    try {
      const snippetDoc = await getDoc(doc(db, 'snippets', snippet.id));
      if (snippetDoc.exists()) {
        const snippetData = snippetDoc.data() as Snippet;
        setCode(snippetData.content);
        setLanguage(snippetData.language);
        setCurrentSnippetTitle(snippetData.title);
        setSnippets(prev => prev.map((s) => s.id === snippet.id ? { ...s, ...snippetData } : s));
      }
    } catch (error) {
      console.error('Error loading snippet:', error);
      toast({
        title: 'Error',
        description: 'Failed to load snippet',
        variant: 'destructive',
      });
    } finally {
      setSelectedSnippetLoading(false);
    }
  }, [toast]);

  // Handle snippet deletion
  const handleDeleteSnippet = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'snippets', id));
      setSnippets(prev => prev.filter(s => s.id !== id));

      if (selectedSnippetId === id) {
        handleNewSnippet();
      }

      toast({
        title: 'Success',
        description: 'Snippet deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete snippet',
        variant: 'destructive',
      });
    }
  }, [selectedSnippetId, handleNewSnippet, toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save with Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      // Run with F5 or Ctrl+Enter
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'Enter')) {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSave, handleRun]);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={cn(
          'w-64 border-r bg-background transition-all duration-300 ease-in-out',
          !sidebarOpen && '-ml-64'
        )}>
          <div className="p-4">
            <Button
              onClick={handleNewSnippet}
              className="w-full mb-4"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Snippet
            </Button>

            <SnippetList
              snippets={snippets}
              onSelectSnippet={handleSelectSnippet}
              onDeleteSnippet={handleDeleteSnippet}
              selectedSnippetId={selectedSnippetId}
              isLoading={isLoadingSnippets}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Toolbar */}
          <div className="border-b p-2 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/')}
                  title="Go to Home"
                >
                  <Home className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Input
                  value={currentSnippetTitle}
                  onChange={(e) => {
                    setCurrentSnippetTitle(e.target.value);
                    // Mark as unsaved when title changes
                    if (selectedSnippetId || e.target.value.trim()) {
                      setAutoSaveStatus('unsaved');
                    }
                  }}
                  placeholder="Untitled"
                  className="w-72"
                />

                <Select
                  value={language}
                  onValueChange={(value) => {
                    const nextLanguage = value as Language;
                    const nextTemplate = defaultCode[nextLanguage];
                    const currentTemplate = defaultCode[language as Language];
                    // Load template if code is empty, matches current template, or is whitespace only
                    const shouldLoadTemplate =
                      !code ||
                      !code.trim() ||
                      code.trim() === currentTemplate.trim() ||
                      code.trim() === nextTemplate.trim();

                    setLanguage(nextLanguage);
                    if (shouldLoadTemplate && nextTemplate) {
                      setCode(nextTemplate);
                    }
                    // Mark as unsaved when language changes
                    if (selectedSnippetId || currentSnippetTitle.trim()) {
                      setAutoSaveStatus('unsaved');
                    }
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-widest">Theme</span>
                  <Select
                    value={editorTheme}
                    onValueChange={(value) => setEditorTheme(value)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {editorThemeOptions.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-widest">Font</span>
                  <input
                    type="range"
                    min={12}
                    max={24}
                    value={editorFontSize}
                    onChange={(e) => setEditorFontSize(Number(e.target.value))}
                    className="h-1 w-32 accent-primary"
                  />
                  <span className="text-xs">{editorFontSize}px</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLineNumbers((prev) => !prev)}
                  className="uppercase text-[11px]"
                >
                  {showLineNumbers ? 'Hide Line #' : 'Show Line #'}
                </Button>
                <Button
                  variant={autoSaveEnabled ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setAutoSaveEnabled((prev) => !prev)}
                  className="uppercase text-[11px]"
                >
                  {autoSaveEnabled ? 'Auto-save On' : 'Auto-save Off'}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground">
                  Enhanced Monaco editor with quick controls for theme, font size, and line numbers.
                </div>
                {autoSaveStatus && currentUser && (selectedSnippetId || currentSnippetTitle.trim()) && (
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs",
                    autoSaveStatus === 'saving' && "text-yellow-500",
                    autoSaveStatus === 'saved' && "text-green-500",
                    autoSaveStatus === 'unsaved' && "text-muted-foreground"
                  )}>
                    {autoSaveStatus === 'saving' && (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Saving...</span>
                      </>
                    )}
                    {autoSaveStatus === 'saved' && (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Saved</span>
                      </>
                    )}
                    {autoSaveStatus === 'unsaved' && (
                      <span>Unsaved changes</span>
                    )}
                  </div>
                )}
                {!autoSaveEnabled && (
                  <div className="text-xs text-destructive">Autosave paused</div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleRun}
                  disabled={isRunning}
                  variant="outline"
                  size="sm"
                >
                  {isRunning ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  Run
                </Button>

                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  size="sm"
                >
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Editor and Output */}
          <div className="flex-1 flex overflow-hidden">
            <div className="relative flex-1 overflow-auto p-4 bg-editor-bg">
              <div
                className={cn(
                  'pointer-events-none absolute inset-4 rounded-lg border border-dashed border-border bg-transparent transition-opacity duration-300',
                  selectedSnippetLoading ? 'opacity-100' : 'opacity-0'
                )}
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>Loading snippet…</span>
                  <div className="h-3 w-20 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
              <EditorComponent
                initialCode={code}
                language={language}
                onChange={handleCodeChange}
                fontSize={editorFontSize}
                theme={editorTheme}
                lineNumbers={showLineNumbers}
              />
            </div>

            <div className="w-1/3 border-l">
              <OutputConsole
                output={output}
                isRunning={isRunning}
                isError={isError}
                executionTime={executionTime}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Snippet</DialogTitle>
            <DialogDescription>
              Please enter a title for your snippet
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="snippet-title" className="text-right">
                Title
              </Label>
              <Input
                id="snippet-title"
                value={snippetTitle}
                onChange={(e) => setSnippetTitle(e.target.value)}
                placeholder="Enter snippet title"
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setSaveDialogOpen(false);
                    handleDialogSave();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCurrentSnippetTitle(snippetTitle);
                setSaveDialogOpen(false);
                handleSave();
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}