// Judge0 API Service for Code Execution
// API Documentation: https://ce.judge0.com/
const JUDGE0_API_URL = 'https://ce.judge0.com/';

// Language mapping from CodeFlow to Judge0
// Judge0 uses language IDs
const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
  csharp: 51,
  ruby: 72,
  go: 79,
  rust: 73,
  php: 68,
  typescript: 74,
  kotlin: 77,
  swift: 83,
  r: 80,
  sql: 86,
};

export interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime?: number;
  isCompileError?: boolean;
}

export interface Judge0Response {
  token: string;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  status?: {
    id: number;
    description: string;
  };
  time?: string;
  memory?: string;
}

/**
 * Execute code using Judge0 API
 * @param code - The source code to execute
 * @param language - The programming language (CodeFlow format)
 * @returns ExecutionResult with output or error
 */
export async function executeCode(code: string, language: string): Promise<ExecutionResult> {
  const langId = languageMap[language];

  if (!langId) {
    return {
      output: '',
      error: `Language "${language}" is not supported by Judge0 API`,
    };
  }

  try {
    const startTime = performance.now();

    // Submit the code for execution
    const response = await fetch(`${JUDGE0_API_URL}submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: langId,
        stdin: '',
        expected_output: null,
        cpu_time_limit: 2,
        memory_limit: 128000,
      }),
    });

    if (!response.ok) {
      return {
        output: '',
        error: `Failed to execute code: ${response.status} ${response.statusText}`,
      };
    }

    const submitData = await response.json();
    const token = submitData.token;

    // Poll for the result
    let result: Judge0Response | null = null;
    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const resultResponse = await fetch(`${JUDGE0_API_URL}submissions/${token}`);
      
      if (resultResponse.ok) {
        result = await resultResponse.json();
        
        if (result.status?.id >= 3) {
          break;
        }
      }
      
      attempts++;
    }

    if (!result) {
      return {
        output: '',
        error: 'Execution timed out',
      };
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Process the result
    if (result.status?.id === 3) {
      // Success
      return {
        output: result.stdout || '',
        error: null,
        isCompileError: false,
        executionTime,
      };
    } else if (result.status?.id === 6) {
      // Compile error
      return {
        output: '',
        error: result.compile_output || 'Compilation error',
        isCompileError: true,
        executionTime,
      };
    } else if (result.status?.id === 5) {
      // Runtime error
      return {
        output: '',
        error: result.stderr || 'Runtime error',
        isCompileError: false,
        executionTime,
      };
    } else {
      // Other error
      return {
        output: '',
        error: result.message || result.stderr || 'Execution failed',
        isCompileError: false,
        executionTime,
      };
    }
  } catch (error) {
    console.error('Judge0 API Error:', error);
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
 * Get list of available Judge0 languages
 * Useful for debugging or showing available languages
 */
export async function getAvailableRuntimes(): Promise<any[]> {
  try {
    const response = await fetch(`${JUDGE0_API_URL}languages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Judge0 languages:', error);
    return [];
  }
}
