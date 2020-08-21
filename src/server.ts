import { ApolloServer } from 'apollo-server-lambda';

import { AuthUser } from './auth-type';
import { config } from './config';

export interface IContext {
    user: AuthUser;
}

const server = new ApolloServer({
    typeDefs: config.typeDefs,
    resolvers: config.resolvers,
    context: ({ event }): IContext => {
        const { authorizer }: { authorizer: AuthUser } = event.requestContext;

        return {
            user: {
                id: authorizer.id,
                email: authorizer.email,
                avatar: authorizer.avatar,
                nickname: authorizer.nickname,
            },
        }
    },
});

export const graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
      },
});
