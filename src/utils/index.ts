import { ERROR_MESSAGE_PREFIX } from '@/constants';
import bcrypt from 'bcrypt';

export async function genPersonalKey(): Promise<string> {
  return await bcrypt.genSalt(6);
}

export function withErrorMessagePrefix(message: string) {
  return `${ERROR_MESSAGE_PREFIX}${message}`;
}
