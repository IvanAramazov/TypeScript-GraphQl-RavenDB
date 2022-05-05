import {GraphQLObjectType, GraphQLString} from "graphql";
import {UserInfo} from "../../entity/user/UserInfo";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        email: {type: GraphQLString},
        info: {type: UserInfoType}
    })
})

export const UserInfoType = new GraphQLObjectType({
    name: 'UserInfo',
    fields: () => ({
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        displayName: {type: GraphQLString},
        role: {type: GraphQLString}
    })

})