export interface UsersOrders {
  id: number;
  email: string;
  role: 'manager' | 'user' | 'anonymous';
  name: string | null;
}
