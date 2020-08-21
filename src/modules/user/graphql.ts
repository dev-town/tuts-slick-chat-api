import { gql } from 'apollo-server-lambda';

import { IContext } from '../../server';
import { user } from './repo';
import * as GQL from '../../types/graphql';

export const typeDefs = gql`

type User {
    id: ID!
    nickname: String!
    avatar: String!
}

extend type Query {
    me: User
}
`;

export const resolvers: GQL.IResolvers<IContext> = {
    Query: {
        me: (parent, params, { user: userData }) => user.getCurrentUser(userData),
    },
};
