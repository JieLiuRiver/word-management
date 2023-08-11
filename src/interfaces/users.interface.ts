export enum EUserType {
  USER,
  ADMIN,
}

export interface User {
  id: number;
  name: string;
  type: EUserType;
  personalKey: string;
}
