import { GraphQLUnionType} from "graphql";
import {UserType} from "./UserType";
import {CustomErrorType} from "./ErrorType";
import {User} from "../../entity/user/User";
import {CustomError} from "../../entity/Error";

export const UserUnionType = new GraphQLUnionType({
    name:"UserUnionType",
    types: [UserType, CustomErrorType],
    resolveType(value){
        if (value instanceof User) {
            return UserType;
        }
        if (value instanceof CustomError) {
            return CustomErrorType;
        }
    }
})
