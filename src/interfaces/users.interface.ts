export enum EUserType {
  USER,
  ADMIN,
}

export interface User {
  id: number;
  name: string;
  type: EUserType;
  no: string;
  personalKey: string;
}
