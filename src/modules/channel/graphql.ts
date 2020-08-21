import { gql } from 'apollo-server-lambda';

import { channel } from './repo';
import { IContext } from '../../server';
import * as GQL from '../../types/graphql';

export const typeDefs = gql`
type Channel {
    id: ID!
    name: String!
    isFavorite: Boolean!
}

extend type Query {
    getChannels: [Channel!]!
    getChannelByID(id: String!): Channel
}

input CreateChannelInput {
    name: String!
}

input FavoriteChannelInput{
    id: ID!
    isFavorite: Boolean!
}

extend type Mutation {
    createChannel(input: CreateChannelInput): Channel
    favoriteChannel(input: FavoriteChannelInput): Channel
}
`;

export const resolvers: GQL.IResolvers<IContext> = {
    Query: {
        getChannels: (_, params, { user }) => channel.getChannels(user),
        getChannelByID: (_, params, { user }) => channel.getChannelById(user, params.id),
    },
    Mutation: {
        createChannel: (parent, { input }, { user }) => channel.createChannel(user, input),
        favoriteChannel: (parent, { input }, { user }) => channel.addToFavorite(user, input),
    }
};
