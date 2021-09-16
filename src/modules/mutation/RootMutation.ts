import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {UserUnionType} from "../types/UnionType";
import {UserInfo} from "../../entity/user/UserInfo";
import {documentStore} from "../../constants";
import {User} from "../../entity/user/User";

export const RootMutation = new GraphQLObjectType({
    name:'UserMutation',
    fields:{
        addUserInfo:{
            type: UserUnionType,
            args:{
                userId: {type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            async resolve (parentValue, args){
                const session = documentStore.openSession();

                const info = new UserInfo(args.firstName, args.lastName,args.age, args.userId);
                await session.store(info);

                await session.saveChanges();

                return info;
            }
        },
        editUserInfo:{
            type: UserUnionType,
            args:{
                userId: {type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            async resolve (parentValue, args){
                const session = documentStore.openSession();

                const user: User = await session.include("UserInfo").load(args.userId)
                const info: UserInfo = await session.load(user.userInfoId)

                info.firstName = args.firstName;
                info.lastName = args.lastName;
                info.age = args.age;

                await session.saveChanges();

                return {
                    id: user.id,
                    message: "Update Successful"
                };
            }
        }
    }
})