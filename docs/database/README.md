# Database Rule

PostgreSQL 컨테이너 환경 및 데이터베이스 관리 지침.

## 1. 기술 스택

- RDBMS: PostgreSQL 17 (Alpine)
- Environment: Docker Compose

## 2. 운영 규칙

- 로컬 DB는 `docker compose`로 구동 및 관리한다.
- 스키마 변경은 마이그레이션 도구 또는 버전 관리 스크립트를 거친다.
