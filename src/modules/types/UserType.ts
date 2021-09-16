import {GraphQLObjectType, GraphQLString} from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        message: {type: GraphQLString},
    })
})