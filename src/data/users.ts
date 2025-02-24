export interface User {
  email: string;
  password: string;
  name: string;
}

export const users: User[] = [
  {
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo Kullanıcı',
  },
];
