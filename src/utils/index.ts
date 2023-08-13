import { ERROR_MESSAGE_PREFIX } from '@/constants';
import bcrypt from 'bcrypt';

export async function genPersonalKey(): Promise<string> {
  return await bcrypt.genSalt(6);
}

export function withErrorMessagePrefix(message: string) {
  return `${ERROR_MESSAGE_PREFIX}${message}`;
}

export function omit<T>(source: T, props: string[] = []) {
  const result: Partial<T> = {};
  for (const attr in source) {
    if (!props.includes(attr)) {
      result[attr] = source[attr];
    }
  }
  return result;
}
