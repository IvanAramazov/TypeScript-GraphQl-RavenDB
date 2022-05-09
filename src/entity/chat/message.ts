import {User} from "../user/User";

export class Message {
    userId: string;
    user: string;
    content: string;
    timestamp: Date;

    constructor(user: User, content: string, timestamp: Date) {
        this.userId = user.id;
        this.user = user.info.displayName;
        this.content = content;
        this.timestamp = timestamp;
    }
}