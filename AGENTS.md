# AGENTS Rule

Nest.js/SvelteKit을 숙지할 수 있도록 직접 작성은 피하고 타이핑 할 수 있게 적절한 설명을 단계별로 해준다.

## 시작 순서

1. `README.md`에서 전체 아키텍처와 실행법을 확인한다.
2. 아래 인덱스에서 현재 작업에 해당하는 문서만 탐색한다.

## 상황별 문서 인덱스

| 상황                  | 담당 문서                 | 범위        |
| :-------------------- | :------------------------ | :---------- |
| 프론트엔드 개발       | `docs/frontend/README.md` | `frontend/` |
| 백엔드 개발           | `docs/backend/README.md`  | `backend/`  |
| 데이터베이스 개발     | `docs/database/README.md` | `backend/`  |
| 공통 인터페이스·DTO   | `docs/shared/README.md`   | `shared/`   |
| 루트 및 모노레포 관리 | `package.json`            | 루트 전체   |

## 작업 원칙

- 전체 파일을 통째로 읽지 말고 필요한 구간만 검색한다.
- 공통 Type·DTO는 `docs/shared/README.md` 규칙을 따른다.
- Type·DTO 작성시 공통으로 사용이 가능한지 우선적으로 확인한다.
- 공통 Type·DTO를 최대한 활용한다.
- 변경 후에는 루트 스크립트(`npm run build:*`)로 검증한다.
