# 🏗️ CodeFlow - Complete Architecture Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Component Architecture](#component-architecture)
4. [Database Schema](#database-schema)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Security Architecture](#security-architecture)
7. [Deployment Architecture](#deployment-architecture)
8. [Technology Stack](#technology-stack)
9. [API Endpoints](#api-endpoints)
10. [Function Verification](#function-verification)
11. [Unique Selling Points](#unique-selling-points)

---

## System Overview

CodeFlow is a **cloud-based AI-powered code editor** built with React, TypeScript, and Firebase. It provides a VS Code-like experience in the browser with multi-language support, real-time code execution, AI assistance, and cloud storage for code snippets.

### Key Characteristics

- **AI-Powered**: Google Generative AI (Gemini Pro) for coding assistance
- **Multi-Language**: 15+ programming languages with syntax highlighting
- **Real-Time Execution**: Judge0 API for instant code execution
- **Cloud Storage**: Firebase Firestore for snippet persistence
- **Modern UI**: Monaco Editor with shadcn/ui components
- **Responsive**: Mobile-first design with collapsible sidebar
- **Secure**: Firebase Authentication with role-based access

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Desktop    │  │    Mobile    │  │    Tablet    │         │
│  │  (Browser)   │  │  (Browser)   │  │  (Browser)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│           │                 │                 │                  │
│           └─────────────────┴─────────────────┘                  │
│                           │                                      │
│                    HTTPS / HTTP                                 │
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│                    PRESENTATION LAYER                             │
├───────────────────────────┼──────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    React 18.3.1                           │     │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐       │     │
│  │  │   Landing  │  │   Editor   │  │   Login    │       │     │
│  │  │   Page     │  │   Page     │  │   Page     │       │     │
│  │  │  (264)     │  │  (904)     │  │  (184)     │       │     │
│  │  └────────────┘  └────────────┘  └────────────┘       │     │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐       │     │
│  │  │  Signup    │  │  Verify    │  │  Update    │       │     │
│  │  │  (247)     │  │   Email    │  │  Password  │       │     │
│  │  └────────────┘  └────────────┘  └────────────┘       │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    UI Components                           │     │
│  │  • Monaco Editor (VS Code engine)                          │     │
│  │  • AI Chat Widget (313 lines)                             │     │
│  │  • Snippet List (247 lines)                               │     │
│  │  • Navbar (167 lines)                                     │     │
│  │  • shadcn/ui (40+ components)                             │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│                    APPLICATION LAYER                             │
├───────────────────────────┼──────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    React Contexts                         │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  AuthContext (225 lines)                         │   │     │
│  │  │  • User authentication state                     │   │     │
│  │  │  • signup, login, logout, Google login           │   │     │
│  │  │  • Email link authentication                     │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  ThemeContext                                   │   │     │
│  │  │  • Light/Dark mode management                   │   │     │
│  │  │  • System preference detection                 │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    Custom Hooks                           │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  useAutoSave (55 lines)                          │   │     │
│  │  │  • Debounced auto-save (2s delay)               │   │     │
│  │  │  • Prevents concurrent saves                    │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  useKeyboardShortcuts (46 lines)                │   │     │
│  │  │  • Global keyboard shortcuts                    │   │     │
│  │  │  • Ctrl+S, F5, Ctrl+N, etc.                    │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  useDebounce, use-mobile, use-toast             │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    Business Logic                          │     │
│  │  • Code execution via Judge0 API                         │     │
│  │  • AI chat with context awareness                        │     │
│  │  • Snippet CRUD operations                               │     │
│  │  • Folder path management                               │     │
│  │  • Duplicate title handling                             │     │
│  │  • Ownership verification                               │     │
│  │  • Rate limiting for code execution                     │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│                    DATA ACCESS LAYER                             │
├───────────────────────────┼──────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    Firebase SDK                           │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  Firebase Authentication                         │   │     │
│  │  │  • Email/Password auth                          │   │     │
│  │  │  • Google OAuth                                 │   │     │
│  │  │  • Email link authentication                    │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  Firestore                                      │   │     │
│  │  │  • Real-time database                           │   │     │
│  │  │  • User-specific queries                        │   │     │
│  │  │  • Batch operations                             │   │     │
│  │  │  • Server timestamps                            │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    External APIs                          │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  Judge0 API (piston.ts - 199 lines)            │   │     │
│  │  │  • Code execution                              │   │     │
│  │  │  • 15+ language support                        │   │     │
│  │  │  • Polling mechanism                           │   │     │
│  │  │  • Error handling                              │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  Google Generative AI (gemini.ts - 54 lines)    │   │     │
│  │  │  • AI chat responses                           │   │     │
│  │  │  • Conversation history                         │   │     │
│  │  │  • System instructions                         │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│                    DATA STORAGE LAYER                             │
├───────────────────────────┼──────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    Firebase Firestore                       │     │
│  │  ┌────────────────────────────────────────────────┐   │     │
│  │  │  Collections:                                    │   │     │
│  │  │  • snippets (user code snippets)                │   │     │
│  │  │  • folders (folder structure)                    │   │     │
│  │  │  • users (Firebase Auth)                        │   │     │
│  │  └────────────────────────────────────────────────┘   │     │
│  │  • Real-time sync                                    │     │
│  │  • Offline support                                   │     │
│  │  • Automatic scaling                                 │     │
│  └──────────────────────────────────────────────────────────┘     │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│                    EXTERNAL SERVICES                              │
├───────────────────────────┼──────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Judge0 API  │  │  Google AI   │  │   Firebase   │         │
│  │  Code Exec   │  │  Gemini Pro  │  │  Services    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### 1. Authentication Module

```
┌─────────────────────────────────────────────────────────┐
│              AUTHENTICATION COMPONENT                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Signup     │───▶│  Firebase    │                  │
│  │  (247 lines) │    │   Auth       │                  │
│  └──────────────┘    └──────────────┘                  │
│         │                     │                          │
│         │                     │                          │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Login      │───▶│  Session     │                  │
│  │  (184 lines) │    │  Management  │                  │
│  └──────────────┘    └──────────────┘                  │
│         │                     │                          │
│         │                     │                          │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │  Google      │───▶│  AuthContext │                  │
│  │  Sign-in     │    │ (225 lines)  │                  │
│  └──────────────┘    └──────────────┘                  │
│         │                     │                          │
│         │                     │                          │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │ Email Link   │───▶│ Protected    │                  │
│  │  Auth        │    │   Routes     │                  │
│  └──────────────┘    └──────────────┘                  │
│                                                           │
│  Features:                                               │
│  • Email/Password authentication                         │
│  • Google OAuth                                          │
│  • Email link authentication                             │
│  • Session persistence                                   │
│  • Toast notifications                                   │
│  • Protected routes                                      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 2. Code Editor Module

```
┌─────────────────────────────────────────────────────────┐
│              CODE EDITOR COMPONENT                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Monaco Editor Wrapper                 │    │
│  │            (EditorComponent.tsx - 97 lines)      │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Syntax highlighting (15+ languages)   │   │    │
│  │  │  • IntelliSense support                  │   │    │
│  │  │  • Customizable themes                   │   │    │
│  │  │  • Adjustable font size (12-24px)        │   │    │
│  │  │  • Line numbers toggle                   │   │    │
│  │  │  • Minimap, bracket pairs                │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                         │                                  │
│                         ▼                                  │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Editor Page (904 lines)              │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  State Management:                       │   │    │
│  │  │  • Code, language, output                │   │    │
│  │  │  • Snippets, UI settings                 │   │    │
│  │  │  • Auto-save status                     │   │    │
│  │  │                                          │   │    │
│  │  │  Integrations:                          │   │    │
│  │  │  • Code execution (Judge0)              │   │    │
│  │  │  • Snippet CRUD (Firebase)              │   │    │
│  │  │  • AI chat (Gemini)                     │   │    │
│  │  │  • Keyboard shortcuts                   │   │    │
│  │  │  • Auto-save hook                       │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                         │                                  │
│                         ▼                                  │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Output Console                      │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Execution output display             │   │    │
│  │  │  • Error highlighting                   │   │    │
│  │  │  • Execution time tracking             │   │    │
│  │  │  • Compile/runtime error distinction    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 3. Code Execution Module

```
┌─────────────────────────────────────────────────────────┐
│            CODE EXECUTION COMPONENT                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  User clicks "Run" (F5 or Ctrl+Enter)                     │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Pre-flight Validation                    │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Code size check (100KB max)          │   │    │
│  │  │  • Language validation                  │   │    │
│  │  │  • Rate limit check (10/min, 50/hour)   │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Language Mapping                        │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  CodeFlow → Judge0 Language IDs         │   │    │
│  │  │  javascript → 63, python → 71           │   │    │
│  │  │  java → 62, c → 50, cpp → 54           │   │    │
│  │  │  csharp → 51, ruby → 72, go → 60       │   │    │
│  │  │  rust → 73, php → 68, typescript → 74 │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Submit to Judge0 API                     │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  POST /submissions                       │   │    │
│  │  │  • source_code                           │   │    │
│  │  │  • language_id                           │   │    │
│  │  │  • cpu_time_limit: 2s                    │   │    │
│  │  │  • memory_limit: 128MB                   │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Polling Mechanism                       │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • GET /submissions/{token}             │   │    │
│  │  │  • 1-second intervals                    │   │    │
│  │  │  • Max 20 attempts                       │   │    │
│  │  │  • Status check (id >= 3 = complete)    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Result Processing                        │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  Status 3: Success → stdout             │   │    │
│  │  │  Status 6: Compile Error → compile_output│   │    │
│  │  │  Status 5: Runtime Error → stderr       │   │    │
│  │  │  Other: Error → message               │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 4. AI Chat Module

```
┌─────────────────────────────────────────────────────────┐
│              AI CHAT COMPONENT                            │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  User sends message to AI widget                          │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         AI Chat Widget (313 lines)              │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Chat interface with history          │   │    │
│  │  │  • Quick prompts (Explain, Debug, etc.)  │   │    │
│  │  │  • Markdown rendering (react-markdown)   │   │    │
│  │  │  • Minimize/maximize functionality       │   │    │
│  │  │  • Loading states                        │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Context Building                         │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Current code from editor            │   │    │
│  │  │  • Current language                     │   │    │
│  │  │  • Conversation history                 │   │    │
│  │  │  • System instruction                    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         API Call (gemini.ts - 54 lines)         │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  POST /api/ai-chat                      │   │    │
│  │  │  • message                              │   │    │
│  │  │  • conversationHistory                  │   │    │
│  │  │  • systemInstruction                    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Vercel Serverless Function               │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Google Generative AI (Gemini Pro)  │   │    │
│  │  │  • Server-side API key                 │   │    │
│  │  │  • CORS enabled                         │   │    │
│  │  │  • Error handling                       │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Response Display                         │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Markdown rendering                    │   │    │
│  │  │  • Code block highlighting              │   │    │
│  │  │  • Add to conversation history          │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 5. Snippet Management Module

```
┌─────────────────────────────────────────────────────────┐
│           SNIPPET MANAGEMENT COMPONENT                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Snippet List (247 lines)                │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Search by title and code             │   │    │
│  │  │  • Filter by language                   │   │    │
│  │  │  • Language color coding               │   │    │
│  │  │  • Relative time display               │   │    │
│  │  │  • Delete with confirmation            │   │    │
│  │  │  • ScrollArea for performance          │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Snippet Operations (snippets.ts)         │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  saveSnippet (77-139 lines)             │   │    │
│  │  │  • Check for duplicates                │   │    │
│  │  │  • Append timestamp if needed           │   │    │
│  │  │  • Ensure folder path exists           │   │    │
│  │  │  • Create Firestore document          │   │    │
│  │  │                                          │   │    │
│  │  │  upsertSnippet (141-172 lines)          │   │    │
│  │  │  • Update if ID exists                 │   │    │
│  │  │  • Create if no ID                      │   │    │
│  │  │                                          │   │    │
│  │  │  getAllSnippets (174-196 lines)         │   │    │
│  │  │  • Query by user_id                     │   │    │
│  │  │  • Order by created_at desc             │   │    │
│  │  │                                          │   │    │
│  │  │  deleteSnippet (198-227 lines)          │   │    │
│  │  │  • Verify ownership                    │   │    │
│  │  │  • Delete document                      │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Folder Management                       │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  ensureFolderPathExists (45-75 lines)  │   │    │
│  │  │  • Batch create folders                  │   │    │
│  │  │  • Check existence before creation      │   │    │
│  │  │  • Atomic operations                    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │         Firestore Database                       │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  Collection: snippets                    │   │    │
│  │  │  • title, code, language                │   │    │
│  │  │  • user_id, folder_path                 │   │    │
│  │  │  • created_at, updated_at               │   │    │
│  │  │                                          │   │    │
│  │  │  Collection: folders                     │   │    │
│  │  │  • name, path, user_id                 │   │    │
│  │  │  • created_at, updated_at               │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE SCHEMA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐                                            │
│  │     User         │                                            │
│  │  (Firebase Auth)  │                                            │
│  │  ┌──────────────┐│                                            │
│  │  │ uid (PK)      ││                                            │
│  │  │ email         ││                                            │
│  │  │ displayName   ││                                            │
│  │  │ photoURL      ││                                            │
│  │  │ emailVerified ││                                            │
│  │  └──────────────┘│                                            │
│  └────────┬─────────┘                                            │
│           │ 1:N                                                   │
│           ▼                                                      │
│  ┌──────────────────┐                                            │
│  │    Snippet       │                                            │
│  │  ┌──────────────┐│                                            │
│  │  │ id (PK)       ││                                            │
│  │  │ title         ││                                            │
│  │  │ code          ││                                            │
│  │  │ language      ││                                            │
│  │  │ user_id (FK)  ││◀─────────────────┐                         │
│  │  │ folder_path   ││                  │                         │
│  │  │ folder        ││                  │                         │
│  │  │ tags          ││                  │                         │
│  │  │ is_favorite   ││                  │                         │
│  │  │ original_title││                  │                         │
│  │  │ created_at    ││                  │                         │
│  │  │ updated_at    ││                  │                         │
│  │  └──────────────┘│                  │                         │
│  └──────────────────┘                  │                         │
│                                       │                         │
│  ┌──────────────────┐                  │                         │
│  │     Folder       │                  │                         │
│  │  ┌──────────────┐│                  │                         │
│  │  │ id (PK)       ││                  │                         │
│  │  │ name          ││                  │                         │
│  │  │ path          ││                  │                         │
│  │  │ user_id (FK)  ││◀─────────────────┘                         │
│  │  │ created_at    ││                                            │
│  │  │ updated_at    ││                                            │
│  │  └──────────────┘│                                            │
│  └──────────────────┘                                            │
│                                                                   │
│  Indexes:                                                        │
│  • snippets: user_id (for user-specific queries)                 │
│  • snippets: (user_id, title, folder_path) (for duplicate check)  │
│  • folders: user_id (for user-specific queries)                  │
│  • folders: path (for folder existence check)                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Collection Details

#### Snippets Collection

```typescript
{
  id: string;                    // Auto-generated document ID
  title: string;                 // Snippet title
  code: string;                  // Source code
  language: string;              // Programming language
  user_id: string;               // Firebase Auth user ID
  folder_path: string[];         // Array of folder names
  folder: string;                // Current folder name
  tags?: string[];               // Optional tags
  is_favorite?: boolean;         // Favorite flag
  original_title: string;        // Original title (before duplicate)
  created_at: Timestamp;         // Server timestamp
  updated_at: Timestamp;         // Server timestamp
}
```

#### Folders Collection

```typescript
{
  id: string;                    // Path-based ID (e.g., "folder/subfolder")
  name: string;                  // Folder name
  path: string[];                // Full path array
  user_id: string;               // Firebase Auth user ID
  created_at: Timestamp;         // Server timestamp
  updated_at: Timestamp;         // Server timestamp
}
```

---

## Data Flow Diagrams

### Code Execution Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ 1. Click "Run" (F5/Ctrl+Enter)
       ▼
┌─────────────────────────┐
│  Editor.tsx             │
│  - Get current code     │
│  - Get current language │
└──────┬──────────────────┘
       │
       │ 2. Call executeCode()
       ▼
┌─────────────────────────┐
│  Pre-flight Validation  │
│  - Check code size      │
│  - Check rate limit     │
│  - Validate language   │
└──────┬──────────────────┘
       │
       │ 3. Map language
       ▼
┌─────────────────────────┐
│  piston.ts              │
│  - Map CodeFlow → Judge0│
│  - Submit to API        │
└──────┬──────────────────┘
       │
       │ 4. Poll for result
       ▼
┌─────────────────────────┐
│  Polling Loop           │
│  - 1-second intervals   │
│  - Max 20 attempts      │
│  - Check status         │
└──────┬──────────────────┘
       │
       │ 5. Process result
       ▼
┌─────────────────────────┐
│  Result Processing      │
│  - Parse stdout/stderr  │
│  - Detect error type    │
│  - Calculate time       │
└──────┬──────────────────┘
       │
       │ 6. Display output
       ▼
┌─────────────────────────┐
│  OutputConsole.tsx       │
│  - Show output/errors   │
│  - Highlight errors     │
│  - Show execution time  │
└─────────────────────────┘
```

### Snippet Save Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ 1. Click "Save" (Ctrl+S)
       ▼
┌─────────────────────────┐
│  Editor.tsx             │
│  - Get title, code, lang │
│  - Get folder path      │
└──────┬──────────────────┘
       │
       │ 2. Call saveSnippet()
       ▼
┌─────────────────────────┐
│  snippets.ts            │
│  - Check authentication │
└──────┬──────────────────┘
       │
       │ 3. Check duplicates
       ▼
┌─────────────────────────┐
│  Firestore Query       │
│  - Query by user_id    │
│  - Query by title      │
│  - Query by folder_path│
└──────┬──────────────────┘
       │
       │ 4. Handle duplicate
       ▼
┌─────────────────────────┐
│  Title Modification     │
│  - Append timestamp    │
│  - Keep original_title │
└──────┬──────────────────┘
       │
       │ 5. Ensure folders
       ▼
┌─────────────────────────┐
│  ensureFolderPathExists │
│  - Batch create folders │
│  - Check existence     │
└──────┬──────────────────┘
       │
       │ 6. Create document
       ▼
┌─────────────────────────┐
│  Firestore Add          │
│  - Create snippet doc  │
│  - Server timestamps    │
└──────┬──────────────────┘
       │
       │ 7. Success
       ▼
┌─────────────────────────┐
│  Update UI              │
│  - Show "Saved" status  │
│  - Refresh snippet list│
└─────────────────────────┘
```

### AI Chat Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ 1. Type message
       ▼
┌─────────────────────────┐
│  AIChatWidget.tsx      │
│  - Get current code    │
│  - Get current language│
│  - Build context       │
└──────┬──────────────────┘
       │
       │ 2. Call askGemini()
       ▼
┌─────────────────────────┐
│  gemini.ts              │
│  - Prepare payload     │
│  - Include history     │
└──────┬──────────────────┘
       │
       │ 3. API call
       ▼
┌─────────────────────────┐
│  POST /api/ai-chat     │
│  - Vercel function     │
│  - CORS headers        │
└──────┬──────────────────┘
       │
       │ 4. Process request
       ▼
┌─────────────────────────┐
│  Google Generative AI   │
│  - Gemini Pro model    │
│  - Server-side key     │
└──────┬──────────────────┘
       │
       │ 5. Generate response
       ▼
┌─────────────────────────┐
│  Response Processing    │
│  - Parse AI response   │
│  - Format timestamp    │
└──────┬──────────────────┘
       │
       │ 6. Return to client
       ▼
┌─────────────────────────┐
│  Display Response       │
│  - Markdown rendering   │
│  - Code highlighting   │
│  - Add to history      │
└─────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  1. AUTHENTICATION LAYER                         │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Firebase Authentication              │   │    │
│  │  │  • Email/Password authentication        │   │    │
│  │  │  • Google OAuth                         │   │    │
│  │  │  • Email link authentication            │   │    │
│  │  │  • Session management                   │   │    │
│  │  │  • Protected routes                     │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  2. AUTHORIZATION LAYER                          │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • User-specific data isolation         │   │    │
│  │  │  • Firestore security rules             │   │    │
│  │  │  • Ownership verification               │   │    │
│  │  │  • User ID filtering in queries         │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  3. INPUT VALIDATION LAYER                       │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Code size validation (100KB max)    │   │    │
│  │  │  • Title length validation (200 chars)  │   │    │
│  │  │  • Tag validation (10 tags, 50 chars)  │   │    │
│  │  │  • Language validation                 │   │    │
│  │  │  • Email validation                    │   │    │
│  │  │  • Password validation (6+ chars)      │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  4. RATE LIMITING LAYER                          │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Code execution: 10/min, 50/hour      │   │    │
│  │  │  • Execution timeout: 30 seconds         │   │    │
│  │  │  • Network timeout: 10 seconds           │   │    │
│  │  │  • RateLimiter class (security.ts)       │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  5. API KEY SECURITY LAYER                      │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Google AI key: Server-side only      │   │    │
│  │  │  • Firebase keys: Environment variables  │   │    │
│  │  │  • No keys in client code               │   │    │
│  │  │  • Vercel environment variables          │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  6. DATA SECURITY LAYER                          │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  • Firestore security rules             │   │    │
│  │  │  • User-specific queries                │   │    │
│  │  │  • Ownership verification              │   │    │
│  │  │  • SSL/TLS for all communications      │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

### Development Environment

```
┌─────────────────────────────────────────────────────────┐
│            DEVELOPMENT ENVIRONMENT                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Developer Machine                                │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  Node.js 18+                            │   │    │
│  │  │  Vite 5.4.10                            │   │    │
│  │  │  npm run dev                            │   │    │
│  │  │  Local Firebase Emulator (optional)    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Local Development Server                       │    │
│  │  • Hot Module Replacement (HMR)                 │    │
│  │  • Fast refresh                               │    │
│  │  • Port: 5173                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  Configuration: .env.local with development keys            │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Production Environment (Vercel)

```
┌─────────────────────────────────────────────────────────┐
│            PRODUCTION ENVIRONMENT (Vercel)               │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Vercel Edge Network                             │    │    │
│  │  • Global CDN distribution                       │    │
│  │  • Automatic HTTPS                              │    │
│  │  • Edge caching                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Static Assets (Vite Build)                     │    │
│  │  • Optimized JavaScript bundles                │    │
│  │  • Minified CSS                                │    │
│  │  • Asset hashing for caching                    │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Vercel Serverless Functions                    │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  /api/ai-chat (68 lines)               │   │    │
│  │  │  • Google Generative AI integration    │   │    │
│  │  │  • Server-side API key                 │   │    │
│  │  │  • CORS enabled                         │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Firebase Services                               │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  Firebase Authentication                 │   │    │
│  │  │  • User management                      │   │    │
│  │  │  • Session handling                     │   │    │
│  │  │                                          │   │    │
│  │  │  Firestore                              │   │    │
│  │  │  • Snippet storage                      │   │    │
│  │  │  • Real-time sync                       │   │    │
│  │  │  • Offline support                      │   │    │
│  │  │                                          │   │    │
│  │  │  Firebase Hosting (optional)            │   │    │
│  │  │  • Static site deployment               │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                       │                                    │
│                       ▼                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  External APIs                                   │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │  Judge0 API (ce.judge0.com)            │   │    │
│  │  │  • Code execution                      │   │    │
│  │  │  • 15+ language support                │   │    │
│  │  │                                          │   │    │
│  │  │  Google Generative AI                   │   │    │
│  │  │  • AI chat responses                   │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | React | 18.3.1 | UI library |
| Language | TypeScript | 5.8.3 | Type-safe development |
| Build Tool | Vite | 5.4.10 | Fast build tool |
| Router | React Router | 6.30.1 | Client-side routing |
| Styling | TailwindCSS | 3.4.17 | Utility-first CSS |
| UI Components | shadcn/ui | Latest | Accessible components |
| Code Editor | Monaco Editor | 4.7.0 | VS Code engine |
| Icons | Lucide React | 0.462.0 | Icon library |
| Data Fetching | React Query | 5.83.0 | Caching & state |
| Markdown | React Markdown | 10.1.0 | Markdown rendering |
| Theme | next-themes | 0.3.0 | Theme management |
| Dates | date-fns | 3.6.0 | Date formatting |
| Toasts | Sonner | 1.7.4 | Notifications |

### Backend & Services

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Authentication | Firebase 12.10.0 | User management |
| Database | Firestore | Cloud storage |
| AI Service | Google Generative AI | AI assistance |
| Code Execution | Judge0 API | Run code |
| Deployment | Vercel | Serverless functions |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| TypeScript ESLint | TypeScript linting |

---

## API Endpoints

### Vercel Serverless Function

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/ai-chat` | AI chat with Gemini Pro |

**Request Body:**
```typescript
{
  message: string;
  conversationHistory?: Array<{role: 'user' | 'model', text: string}>;
  systemInstruction?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  response: string;
  timestamp: string;
}
```

### External APIs

#### Judge0 API
- **Base URL**: `https://ce.judge0.com/`
- **Endpoints**:
  - `POST /submissions` - Submit code for execution
  - `GET /submissions/{token}` - Get execution result
  - `GET /languages` - Get available languages

#### Google Generative AI
- **Model**: Gemini Pro
- **Access**: Via Vercel serverless function
- **Purpose**: AI coding assistance

---

## Function Verification

### Core Functions Status

#### Authentication Functions (AuthContext.tsx)

| Function | Status | Description |
|----------|--------|-------------|
| `signup()` | ✅ Working | Creates user with email/password |
| `login()` | ✅ Working | Authenticates user with email/password |
| `logout()` | ✅ Working | Signs out user |
| `loginWithGoogle()` | ✅ Working | Google OAuth authentication |
| `sendSignInLink()` | ✅ Working | Sends email link for authentication |
| `isSignInLink()` | ✅ Working | Checks if URL is sign-in link |
| `signInWithLink()` | ✅ Working | Authenticates with email link |

#### Snippet Functions (snippets.ts)

| Function | Status | Description |
|----------|--------|-------------|
| `saveSnippet()` | ✅ Working | Saves new snippet with duplicate handling |
| `upsertSnippet()` | ✅ Working | Updates existing or creates new snippet |
| `getAllSnippets()` | ✅ Working | Fetches all user snippets |
| `deleteSnippet()` | ✅ Working | Deletes snippet with ownership verification |
| `ensureFolderPathExists()` | ✅ Working | Creates folder structure atomically |

#### Code Execution Functions (piston.ts)

| Function | Status | Description |
|----------|--------|-------------|
| `executeCode()` | ✅ Working | Executes code via Judge0 API |
| `getAvailableRuntimes()` | ✅ Working | Fetches supported languages |
| `getFileName()` | ✅ Working | Returns language-specific filename |

#### AI Functions (gemini.ts)

| Function | Status | Description |
|----------|--------|-------------|
| `askGemini()` | ✅ Working | Sends message to AI backend |

#### Custom Hooks

| Hook | Status | Description |
|------|--------|-------------|
| `useAutoSave()` | ✅ Working | Debounced auto-save (2s delay) |
| `useKeyboardShortcuts()` | ✅ Working | Global keyboard shortcuts |
| `useDebounce()` | ✅ Working | Debounce utility |
| `use-mobile()` | ✅ Working | Mobile detection |
| `use-toast()` | ✅ Working | Toast notifications |

---

## Unique Selling Points

### What Makes CodeFlow Unique?

#### 1. **AI-Powered Coding Assistant**
- **Competitors**: Most code editors lack built-in AI
- **CodeFlow**: Google Generative AI (Gemini Pro) integration
- **Features**: Context-aware responses, quick prompts, conversation history

#### 2. **Real-Time Code Execution**
- **Competitors**: Many require local setup or have limited execution
- **CodeFlow**: Judge0 API for instant execution of 15+ languages
- **Features**: Polling mechanism, error detection, execution time tracking

#### 3. **Cloud-Based Snippet Management**
- **Competitors**: Local-only or limited cloud sync
- **CodeFlow**: Firebase Firestore with real-time sync
- **Features**: Folder organization, search, filtering, offline support

#### 4. **VS Code-Like Experience**
- **Competitors**: Basic editors with limited features
- **CodeFlow**: Monaco Editor (VS Code engine)
- **Features**: IntelliSense, syntax highlighting, customizable themes

#### 5. **Modern UI/UX**
- **Competitors**: Traditional, often dated interfaces
- **CodeFlow**: shadcn/ui components with dark theme
- **Features**: Responsive design, smooth animations, accessibility

#### 6. **Free & Open Source**
- **Competitors**: Paid subscriptions or limited free tiers
- **CodeFlow**: Completely free with open-source code
- **Features**: No monthly fees, self-hostable option

#### 7. **Multi-Language Support**
- **Competitors**: Limited language support
- **CodeFlow**: 15+ programming languages
- **Languages**: JavaScript, Python, Java, C, C++, C#, Go, Ruby, PHP, TypeScript, Kotlin, Swift, R, SQL

#### 8. **Keyboard Shortcuts**
- **Competitors**: Basic or no shortcuts
- **CodeFlow**: Comprehensive keyboard shortcuts
- **Shortcuts**: Ctrl+S (save), F5 (run), Ctrl+N (new), Ctrl+F (search), etc.

### Feature Comparison Matrix

| Feature | CodeFlow | CodePen | Replit | StackBlitz | JSFiddle |
|---------|----------|---------|--------|------------|----------|
| **AI Assistant** | ✅ Gemini Pro | ❌ | ❌ | ❌ | ❌ |
| **Real-Time Execution** | ✅ Judge0 | ✅ | ✅ | ✅ | ✅ |
| **Cloud Storage** | ✅ Firestore | ✅ | ✅ | ✅ | ❌ |
| **VS Code Editor** | ✅ Monaco | ❌ | ✅ | ✅ | ❌ |
| **Multi-Language** | ✅ 15+ | ✅ | ✅ | ✅ | ✅ |
| **Folder Organization** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Dark Theme** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Keyboard Shortcuts** | ✅ | ⚠️ Limited | ✅ | ⚠️ Limited | ❌ |
| **Mobile Responsive** | ✅ | ✅ | ✅ | ✅ | ⚠️ Limited |
| **Offline Support** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Cost** | ✅ Free | ✅ Free | ⚠️ Freemium | ⚠️ Freemium | ✅ Free |
| **Self-Hostable** | ✅ | ❌ | ❌ | ❌ | ❌ |

### Target Market

**CodeFlow is ideal for**:

1. Students learning programming
2. Developers needing quick code testing
3. Interview preparation and practice
4. Code snippet management and organization
5. AI-assisted coding and debugging
6. Collaborative coding with cloud storage

**CodeFlow is NOT ideal for**:

1. Full-scale project development
2. Complex build processes
3. Database-driven applications
4. Enterprise-level deployments
5. CI/CD pipeline integration

---

## Future Roadmap

### Phase 1: Core Enhancements (Next 3 months)

- [ ] Multiple file support
- [ ] File upload/download
- [ ] Code collaboration features
- [ ] Version history for snippets
- [ ] Advanced search with regex

### Phase 2: AI Enhancements (3-6 months)

- [ ] Code explanation mode
- [ ] Bug detection suggestions
- [ ] Code optimization tips
- [ ] Code generation from prompts
- [ ] Multi-language AI support

### Phase 3: Collaboration Features (6-12 months)

- [ ] Real-time collaborative editing
- [ ] Share snippets via link
- [ ] Public snippet library
- [ ] User profiles
- [ ] Social features (likes, comments)

### Phase 4: Advanced Features (12+ months)

- [ ] Custom AI models
- [ ] Plugin system
- [ ] Integration with GitHub/GitLab
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

---

## Conclusion

CodeFlow is a well-architected, AI-powered code editor that differentiates itself through:

1. **AI Integration** - Google Generative AI for coding assistance
2. **Real-Time Execution** - Judge0 API for instant code running
3. **Cloud Storage** - Firebase Firestore for snippet persistence
4. **Modern UI** - Monaco Editor with shadcn/ui components
5. **Multi-Language** - 15+ programming languages supported
6. **Free & Open Source** - No monthly fees, self-hostable
7. **Responsive Design** - Mobile-first with collapsible sidebar
8. **Security** - Firebase Authentication with data isolation

The architecture is production-ready with proper security, data validation, error handling, and scalable design patterns. While it lacks some features of mature competitors (collaborative editing, project management), its focus on core editing functionality and AI assistance makes it an excellent choice for its target market.

---

**Document Version**: 1.0  
**Last Updated**: October 29, 2026  
**Author**: CodeFlow Development Team  
**Contributors**: Sharvesh C, Likhith
