import {User} from "../user/User";
import {Message} from "./message";
import {documentStore} from "../../constants";

export class Chat {
    id: string
    usersIds: string[] = [];
    history: Message[];

    constructor(usersId: string) {
        this.usersIds.push(usersId);
        this.history = [];
    }
}