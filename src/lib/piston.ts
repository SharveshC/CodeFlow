// Piston API Service for Code Execution
// API Documentation: https://github.com/engineer-man/piston

const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

// Language mapping from CodeFlow to Piston
// Piston uses language names and versions
const languageMap: Record<string, { language: string; version: string }> = {
  javascript: { language: 'javascript', version: '18.15.0' },
  python: { language: 'python', version: '3.10.0' },
  java: { language: 'java', version: '15.0.2' },
  c: { language: 'c', version: '10.2.0' },
  cpp: { language: 'c++', version: '10.2.0' },
  csharp: { language: 'csharp', version: '6.12.0' },
  go: { language: 'go', version: '1.16.2' },
  ruby: { language: 'ruby', version: '3.0.1' },
  php: { language: 'php', version: '8.2.3' },
  bash: { language: 'bash', version: '5.2.0' },
};

export interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime?: number;
  isCompileError?: boolean;
}

export interface PistonResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
}

/**
 * Execute code using Piston API
 * @param code - The source code to execute
 * @param language - The programming language (CodeFlow format)
 * @returns ExecutionResult with output or error
 */
export async function executeCode(
  code: string,
  language: string
): Promise<ExecutionResult> {
  // Check if language is supported
  const langConfig = languageMap[language.toLowerCase()];
  if (!langConfig) {
    return {
      output: '',
      error: `Language "${language}" is not supported by Piston API`,
    };
  }

  try {
    const startTime = performance.now();

    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [
          {
            name: getFileName(language),
            content: code,
          },
        ],
        stdin: '',
        args: [],
        compile_timeout: 10000, // 10 seconds
        run_timeout: 3000, // 3 seconds
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    const endTime = performance.now();
    const executionTime = Math.round(endTime - startTime);

    if (!response.ok) {
      const errorText = await response.text();
      return {
        output: '',
        error: `API Error (${response.status}): ${errorText}`,
        executionTime,
      };
    }

    const data: PistonResponse = await response.json();

    // Check for compilation errors
    if (data.compile && data.compile.code !== 0) {
      return {
        output: data.compile.output || data.compile.stderr,
        error: 'Compilation failed',
        executionTime,
        isCompileError: true,
      };
    }

    // Check for runtime errors
    if (data.run.code !== 0) {
      const errorOutput = data.run.stderr || data.run.output;
      return {
        output: errorOutput,
        error: `Runtime error (exit code: ${data.run.code})`,
        executionTime,
      };
    }

    // Success - return stdout
    const output = data.run.stdout || data.run.output || '(No output)';
    return {
      output: output.trim(),
      error: null,
      executionTime,
    };
  } catch (error) {
    console.error('Piston API Error:', error);
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get appropriate filename for the language
 */
function getFileName(language: string): string {
  const fileNames: Record<string, string> = {
    javascript: 'main.js',
    python: 'main.py',
    java: 'Main.java',
    c: 'main.c',
    cpp: 'main.cpp',
    csharp: 'Main.cs',
    go: 'main.go',
    ruby: 'main.rb',
    php: 'main.php',
    bash: 'main.sh',
  };
  return fileNames[language.toLowerCase()] || 'main.txt';
}

/**
 * Get list of available Piston runtimes
 * Useful for debugging or showing available languages
 */
export async function getAvailableRuntimes(): Promise<any[]> {
  try {
    const response = await fetch(`${PISTON_API_URL}/runtimes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch runtimes: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Piston runtimes:', error);
    return [];
  }
}
