import {GraphQLObjectType, GraphQLString} from "graphql";
import {User} from "../../entity/user/User";
import {UserUnionType} from "../types/UnionType";
import {CustomError} from "../../entity/Error";

export const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserUnionType,
            args: {id: {type: GraphQLString}},
            async resolve(parentValue, args) {
                const user = await User.findUserByID(args.id);
                if(!user){
                    return new CustomError("USER_ERROR","User not found")
                }
                return user;
            }
        }
    }
})