import {GraphQLSchema} from 'graphql';
import {RootQuery} from "./modules/query/RootQuery";
import {RootMutation} from "./modules/mutation/RootMutation";
import {RootSubscription} from "./modules/subscription/RootSubscription";

export const mySchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})