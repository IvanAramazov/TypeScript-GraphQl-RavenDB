import {GraphQLObjectType, GraphQLString} from "graphql";

export const CustomErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: () => ({
        errorType: {type: GraphQLString},
        message: {type: GraphQLString}
    })
})
