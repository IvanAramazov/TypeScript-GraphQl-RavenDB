import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString,} from "graphql";
import {MessageType} from "../types/ChatType";

export const RootSubscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        newMessage: {
            type: new GraphQLNonNull(MessageType),
            args:{
                userId: {type: new GraphQLNonNull(GraphQLList(GraphQLString))},
            },
            subscribe: (parent, args, {pubsub}) => {
               return pubsub.asyncIterator(args.userId);
            },
        }
    }
})