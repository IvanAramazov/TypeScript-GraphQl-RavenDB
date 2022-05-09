import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {UserType} from "./UserType";
import {DateScalarType} from "./DateScalarType";

export const ChatType = new GraphQLObjectType({
    name: 'Chat',
    fields: () => ({
        id: {type: GraphQLString},
        usersIds: {type: new GraphQLList(GraphQLString)},
        history: {type: new GraphQLList(MessageType)}
    })
})

export const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        userId: {type: GraphQLString},
        user: {type: GraphQLString},
        content: {type: GraphQLString},
        timestamp: {type: DateScalarType}
    })
})

export const ChatListType = new GraphQLObjectType({
    name: 'ChatList',
    fields: () => ({
        chatList: {type: new GraphQLList(ChatType)}
    })
})