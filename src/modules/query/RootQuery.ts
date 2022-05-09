import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {User} from "../../entity/user/User";
import {UserUnionType} from "../types/UnionType";
import {CustomError} from "../../entity/Error";
import {ChatListType, ChatType} from "../types/ChatType";
import {documentStore} from "../../constants";
import {Chat, Chatlist} from "../../entity/chat/chat";

export const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserUnionType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue, args) {
                const user = await User.findUserByID(args.id);
                if (!user) {
                    return new CustomError("USER_ERROR", "User not found")
                }
                return user;
            }
        },
        openChat: {
            type: ChatType,
            args: {
                chatId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue, args){
                return await documentStore.openSession().query(Chat).whereEquals("id",args.chatId).firstOrNull();
            }
        },
        chatsByUser:{
            type: ChatListType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue, args){
                return new Chatlist(await documentStore.openSession().query(Chat).containsAny("usersIds", args.userId).all());
            }
        }
    }
})