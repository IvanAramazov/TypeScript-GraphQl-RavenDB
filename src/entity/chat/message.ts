import {User} from "../user/User";

export class Message {
    user: User;
    content: string;
    timestamp: Date;

    constructor(user: User, content: string, timestamp: Date) {
        this.user = user;
        this.content = content;
        this.timestamp = timestamp;
    }
}