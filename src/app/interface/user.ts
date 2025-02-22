import { RangoCinefilo } from './RangoCinefilo';
import { Subscription } from './Subscription';
export interface User {
  id: number;
  name: string;
  email: string;
  rangoCinefilo: RangoCinefilo;
  subscription: Subscription;
  friends: User[];
  friendsFrom: User[];
}
