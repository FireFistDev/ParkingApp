export interface JwtPayload {
    userId: number;
    email: string;
    userName: string;
    balance:number;
    token? : string;
  }