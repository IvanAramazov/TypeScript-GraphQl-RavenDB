import {documentStore} from "../../constants";
import {UserInfo} from "./UserInfo";

export class User {
    id: string;
    email: string;
    password: string;
    confirmed: boolean;
    info: UserInfo;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.info = new UserInfo();
    }

    public static async findUserByID(userId:string){
        return documentStore.openSession().query(User).whereEquals("id",userId).firstOrNull();
    }
    public static async findUserByEmail(email:string){
        return documentStore.openSession().query(User).whereEquals("email",email).firstOrNull();
    }

}
