import {GraphQLSchema} from 'graphql';
import {RootQuery} from "./modules/query/RootQuery";
import {RootMutation} from "./modules/mutation/RootMutation";

export const mySchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})