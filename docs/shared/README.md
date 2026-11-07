# Shared Module (@garage/shared)

- Frontend와 Backend 간 공유하는 공통 타입 및 DTO 패키지.

## 규칙

1. **순수 타입만 정의**: `interface`, `type` 위주로 선언한다.
2. **런타임 의존성 금지**: 프론트엔드 번들 오염 방지를 위해 Node.js 전용 모듈이나 백엔드 전용 라이브러리를 추가하지 않는다.
3. **진입점 등록**: 새로운 타입 추가 시 반드시 `src/index.ts`에서 export한다.
4. **Import 표준**: 상대경로 대신 `@garage/shared`로 참조한다.
