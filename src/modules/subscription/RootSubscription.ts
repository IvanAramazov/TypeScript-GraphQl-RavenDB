import {GraphQLNonNull, GraphQLObjectType,} from "graphql";
import {ChatType, MessageType} from "../types/ChatType";
import {Message} from "../../entity/chat/message";

export const RootSubscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        newMessage: {
            type: new GraphQLNonNull(MessageType),
            subscribe: (parent, args, {pubsub}) => {
               return pubsub.asyncIterator("NEW_MESSAGE");
            },
        }
    }
})