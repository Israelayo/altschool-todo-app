# AltSchool Todo App – TypeScript Conversion

## Project Overview

This branch contains the **TypeScript refactor** of my AltSchool Todo App originally built with JavaScript and React during the Second Semester exam.
The goal of this assignment is to demonstrate proficiency in **TypeScript**, type safety, and maintainable React code patterns.

**Live Demo:** \[[https://typescript-altschool-todo-app.netlify.app/](https://typescript-altschool-todo-app.netlify.app/)]
**Repository:** \[[https://github.com/Israelayo/altschool-todo-app](https://github.com/Israelayo/altschool-todo-app)]

---

## Key Changes in This Branch

- Migrated from **JavaScript (.jsx)** to **TypeScript (.tsx)**
- Added **strict typing** for props, state, and hooks
- Created **custom type definitions** for Todo objects and API responses
- Improved **error handling** with typed `ErrorBoundary`
- Updated **utility functions** to leverage TypeScript types
- Strengthened **component reusability** with typed interfaces

---

## Technology Stack

- **React 19+** (with TypeScript)
- **Vite** (development + build tool)
- **React Router v7**
- **@tanstack/react-query** (typed API calls + caching)
- **Vanilla CSS (BEM methodology)**

---

## Architecture & Design Decisions

- **Types**: All todo-related structures live in `src/types/` for reusability.
- **Components**: Refactored to use `FC<Props>` typing for props.
- **APIs**: Strongly typed fetchers with `useQuery` and `useMutation`.
- **LocalStorage utilities**: Explicit types to prevent runtime errors.
- **ErrorBoundary**: Accepts typed `React.ErrorInfo` for better debugging.

---

## 🙏 Acknowledgements

- Original project built for **AltSchool Second Semester Exam**
- This branch demonstrates **TypeScript conversion** for stronger type safety and maintainability.

---
