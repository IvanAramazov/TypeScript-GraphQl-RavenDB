import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {UserUnionType} from "../types/UnionType";

export const RootMutation = new GraphQLObjectType({
    name:'UserMutation',
    fields:{
        addUser:{
            type: UserUnionType,
            args:{
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
        }
    }
})