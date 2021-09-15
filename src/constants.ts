import { DocumentStore, IDocumentStore } from "ravendb"

const store: IDocumentStore = new DocumentStore(process.env.DB_HOST, process.env.DB_NAME);
export { store as documentStore };

export const host = process.env.DB_HOST;

//Error Types
export const USER_ERROR = "USER_REQUEST_FAILED"

//Error Messages
export const USER_EMAIL_INVALID = "Email address is not valid."
export const USER_PASSWORD_REQUIREMENTS= "Password require at least one number\nPassword require at least one lowercase letter\nPassword require at least one uppercase letter\nPassword require at least at least 8 characters long"
export const USER_COMFIRM_PASSWORD= "Confirm password does not match Password"
export const USER_EXIST= "User exist"
export const USER_DOES_NOT_EXIST= "User does not exist"