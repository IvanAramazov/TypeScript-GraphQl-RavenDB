export class UserInfo {
    id: string
    firstName: string;
    lastName: string;
    age: number;
    userId: string;

    constructor(firstName: string, lastName: string, age: number, userId: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.userId = userId;
    }
}