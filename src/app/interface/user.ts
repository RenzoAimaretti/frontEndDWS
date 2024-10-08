import { RangoCinefilo } from './RangoCinefilo.js';
import { Subscription } from './Subscription.js';
export interface User {
    id: number;
    name: string;
    email: string;
    rangoCinefilo: RangoCinefilo;
    subscription: Subscription;
    friends: User[];
    friendsFrom: User[];
}