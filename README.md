# Garage Web

## Tech Stack

- **Language**: Typescript
- **Frontend**: SvelteKit
- **Backend**: Nest.js
- **Database**: PostgreSQL
- **Package Manager**: npm

## Directory Structure

```text
.
├── backend/   # Nest.js API 서버
├── frontend/  # SvelteKit 웹 클라이언트
└── shared/    # 공통 타입 및 DTO (@garage/shared)
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development

```bash
# Frontend 실행 (http://localhost:5173)
npm run dev:front

# Backend 실행 (http://localhost:3000)
npm run dev:back
```

### 3. Build

```bash
# Frontend 빌드
npm run build:front

# Backend 빌드
npm run build:back
```
