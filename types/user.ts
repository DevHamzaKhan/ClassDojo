export interface User {
    id: string;
    email: string;
    full_name: string | null;
    user_type: string;
    [key: string]: unknown;
  }