import { gql } from 'apollo-server-lambda';

import { IContext } from '../../server';
import { message } from './repo';
import * as GQL from '../../types/graphql';

export const typeDefs = gql`

interface Message {
    id: ID!
    type: String!
    createdAt: String!
}

type TextMessage implements Message {
    id: ID!
    type: String!
    createdAt: String!
    user: User!
    message: String!
}

type SystemMessage implements Message {
    id: ID!
    type: String!
    createdAt: String!
    title: String!
    message: String!
}

extend type Channel {
    messages: [Message!]
}

input SendMessageInput {
    channelId: ID!
    message: String!
}

extend type Mutation {
    sendMessage(input: SendMessageInput): Message
}
`;

export const resolvers: GQL.IResolvers<IContext> = {
    Channel: {
        messages: (parent, params, { user }) => message.getMessages(user, parent.id),
    },
    Message: {
        __resolveType: (obj, context, info) => {
            if (obj.type === 'TEXT_MESSAGE') {
                return 'TextMessage';
            }

            return 'SystemMessage';
        },
    },
    Mutation: {
        sendMessage: (parent, { input }, { user }) => {
            return message.addMessage(user, input.channelId, input.message);
        },
    }
};
