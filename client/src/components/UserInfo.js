import React from 'react';
import { gql, useQuery } from '@apollo/client';

function UserInfo() {
    const getUserInfoQuery = gql`
    query user($userId: String){
      user(id: $userId) {
        ... on User {
          id
          message
        }
        ... on Error {
          errorType
          message
        }
      }
    }`;

    const { loading, error, data } = useQuery(getUserInfoQuery,{
        variables:{
            userId: localStorage.getItem('userId') || ''
        },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <label>User ID</label>
            <p>{data.user.id}</p>
        </div>
    );
}

export default UserInfo;