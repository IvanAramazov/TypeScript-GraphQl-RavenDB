import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {UserUnionType} from "../types/UnionType";
import {UserInfo} from "../../entity/user/UserInfo";
import {documentStore} from "../../constants";
import {User} from "../../entity/user/User";

export const RootMutation = new GraphQLObjectType({
    name:'UserMutation',
    fields:{
        editUserInfo:{
            type: UserUnionType,
            args:{
                userId: {type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                displayName: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve (parentValue, args){
                const session = documentStore.openSession();

                const user: User = await session.include("UserInfo").load(args.userId)
                // const info: UserInfo = await session.load(user.userInfoId)

                user.info.firstName = args.firstName;
                user.info.lastName = args.lastName;
                user.info. displayName = args.displayName;

                await session.saveChanges();

                return user;
            }
        }
    }
})