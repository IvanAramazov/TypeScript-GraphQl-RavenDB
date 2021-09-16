import {documentStore} from "../../constants";

export class User {
    id: string;
    email: string;
    password: string;
    confirmed: boolean;
    userInfoId: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public static async findUserByID(userId:string){
        return documentStore.openSession().query(User).whereEquals("id",userId).firstOrNull();
    }
    public static async findUserByEmail(email:string){
        return documentStore.openSession().query(User).whereEquals("email",email).firstOrNull();
    }

}
