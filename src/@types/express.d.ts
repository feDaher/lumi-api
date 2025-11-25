import type { User } from "../modules/user/user.types";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        email?: string;
        roles?: string[];
      };
    }
  }
}
