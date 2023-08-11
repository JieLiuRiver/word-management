import bcrypt from 'bcrypt';

export async function genPersonalKey(): Promise<string> {
  return await bcrypt.genSalt(6);
}
