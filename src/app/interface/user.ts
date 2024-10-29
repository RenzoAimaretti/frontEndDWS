import { RangoCinefilo } from './rangoCinefilo.js';
import { Subscription } from './subscription.js';
export interface User {
    id: number;
    name: string;
    email: string;
    rangoCinefilo: RangoCinefilo;
    subscription: Subscription;
    friends: User[];
    friendsFrom: User[];
}