// 공통 타입 및 인터페이스
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
}
