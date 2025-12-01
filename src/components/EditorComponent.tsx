import { memo } from 'react';
import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

interface EditorComponentProps {
  initialCode: string;
  language: string;
  onChange: (value: string | undefined) => void;
  fontSize?: number;
  theme?: string;
  lineNumbers?: boolean;
}

const languageMap: Record<string, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  c: 'c',
  cpp: 'cpp',
  csharp: 'csharp',
  java: 'java',
  kotlin: 'kotlin',
  swift: 'swift',
  php: 'php',
  ruby: 'ruby',
  go: 'go',
  rust: 'rust',
  r: 'r',
  perl: 'perl',
  bash: 'shell',
  sql: 'sql',
  scala: 'scala',
  haskell: 'haskell',
  lua: 'lua',
  elixir: 'elixir',
  clojure: 'clojure',
  fsharp: 'fsharp',
  dart: 'dart',
  fortran: 'fortran',
  cobol: 'cobol',
  pascal: 'pascal',
  assembly: 'asm',
  arduino: 'cpp',
};

const EditorComponent = memo(
  ({
    initialCode,
    language,
    onChange,
    fontSize = 14,
    theme = 'vs-dark',
    lineNumbers = true,
  }: EditorComponentProps) => {
    const monacoLanguage = languageMap[language] || 'javascript';

    return (
      <div className="h-full w-full overflow-hidden rounded-lg border border-editor-border bg-editor-bg">
        <Editor
          height="100%"
          language={monacoLanguage}
          value={initialCode}
          onChange={onChange}
          theme={theme}
          loading={
            <div className="flex h-full items-center justify-center bg-editor-bg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            lineNumbers: lineNumbers ? 'on' : 'off',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
        />
      </div>
    );
  }
);

EditorComponent.displayName = 'EditorComponent';

export default EditorComponent;
