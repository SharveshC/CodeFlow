// Security and Performance Configuration

export const SECURITY_CONFIG = {
  // Rate limiting for code execution
  MAX_EXECUTIONS_PER_MINUTE: 10,
  MAX_EXECUTIONS_PER_HOUR: 50,

  // Execution timeouts (in milliseconds)
  EXECUTION_TIMEOUT: 30000, // 30 seconds
  NETWORK_TIMEOUT: 10000, // 10 seconds

  // Code size limits
  MAX_CODE_SIZE: 100000, // 100KB
  MAX_SNIPPET_TITLE_LENGTH: 200,

  // Snippet limits
  MAX_SNIPPETS_PER_USER: 1000,
  MAX_TAGS_PER_SNIPPET: 10,
  MAX_TAG_LENGTH: 50,
};

export const PERFORMANCE_CONFIG = {
  // Pagination
  SNIPPETS_PER_PAGE: 50,
  INITIAL_LOAD_LIMIT: 20,

  // Debounce timers (in milliseconds)
  SEARCH_DEBOUNCE: 300,
  AUTOSAVE_DEBOUNCE: 1000,

  // Cache settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Rate limiter class
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  check(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter((time) => now - time < windowMs);

    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }

    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }

  reset(key: string) {
    this.attempts.delete(key);
  }
}

export const executionRateLimiter = new RateLimiter();

// Validate code size
export function validateCodeSize(code: string): {
  valid: boolean;
  error?: string;
} {
  const size = new Blob([code]).size;

  if (size > SECURITY_CONFIG.MAX_CODE_SIZE) {
    return {
      valid: false,
      error: `Code size (${(size / 1024).toFixed(2)}KB) exceeds maximum allowed size (${(SECURITY_CONFIG.MAX_CODE_SIZE / 1024).toFixed(2)}KB)`,
    };
  }

  return { valid: true };
}

// Validate snippet title
export function validateSnippetTitle(title: string): {
  valid: boolean;
  error?: string;
} {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }

  if (title.length > SECURITY_CONFIG.MAX_SNIPPET_TITLE_LENGTH) {
    return {
      valid: false,
      error: `Title exceeds maximum length of ${SECURITY_CONFIG.MAX_SNIPPET_TITLE_LENGTH} characters`,
    };
  }

  return { valid: true };
}

// Validate tags
export function validateTags(tags: string[]): {
  valid: boolean;
  error?: string;
} {
  if (tags.length > SECURITY_CONFIG.MAX_TAGS_PER_SNIPPET) {
    return {
      valid: false,
      error: `Maximum ${SECURITY_CONFIG.MAX_TAGS_PER_SNIPPET} tags allowed`,
    };
  }

  for (const tag of tags) {
    if (tag.length > SECURITY_CONFIG.MAX_TAG_LENGTH) {
      return {
        valid: false,
        error: `Tag "${tag}" exceeds maximum length of ${SECURITY_CONFIG.MAX_TAG_LENGTH} characters`,
      };
    }
  }

  return { valid: true };
}
