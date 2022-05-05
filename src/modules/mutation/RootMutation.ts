import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {UserUnionType} from "../types/UnionType";
import {UserInfo} from "../../entity/user/UserInfo";
import {documentStore} from "../../constants";
import {User} from "../../entity/user/User";
import {ChatType} from "../types/ChatType";
import {Chat} from "../../entity/chat/chat";
import {Message} from "../../entity/chat/message";

export const RootMutation = new GraphQLObjectType({
    name:'Mutation',
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
        },
        createChat:{
            type: ChatType,
            args:{
                userId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue,args){
                const session = documentStore.openSession();
                const newChat = new Chat(args.userId);
                await session.store(newChat);
                await session.saveChanges();
                return newChat;
            }
        },
        addUserToChat:{
            type: ChatType,
            args:{
                chatId: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue,args){
                const session = documentStore.openSession();
                const chat: Chat = await session.load(args.chatId);
                chat.usersIds.push(args.userId);
                await session.saveChanges();
                return chat;
            }
        },
        sendMessage:{
            type: ChatType,
            args:{
                chatId: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue,args, {pubsub}){
                const user = await User.findUserByID(args.userId);

                const session = documentStore.openSession();
                const chat: Chat = await session.load(args.chatId);
                const message = new Message(user,args.content, new Date())

                chat.history.length === 0 ? chat.history = [message] : chat.history.push(message);

                await session.saveChanges();
                if(pubsub){
                    await pubsub.publish("NEW_MESSAGE", {newMessage: message});
                }
                return chat;
            }
        }
    }
})