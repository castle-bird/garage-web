import { UserResponse } from '@garage/shared';
import { User } from '../../generated/prisma/client.js';

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    role: user.role,
    profileImageId: user.profileImageId,
    createdAt: user.createdAt.toISOString(),
  };
}
