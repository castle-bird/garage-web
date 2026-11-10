// 공통 타입 및 인터페이스
export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
}

// 사용자 권한. → DB Role이랑 동일함. DB 변경시 반영해야함
export type Role = "USER" | "ADMIN";

// 회원가입 요청
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 (Refresh Token은 Cookie에 httpOnly로 전달)
export interface LoginResponse {
  accessToken: string;
}

// 사용자 응답 (password 제외)
export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  role: Role;
  profileImageId: number | null;
  createdAt: string;
}
