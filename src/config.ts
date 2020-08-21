import { gql } from 'apollo-server-lambda';

import { modules } from './modules';
import { merge } from 'lodash';

const typeDef = gql`
    type Query {
        placeholder: Int
    }

    type Subscription {
        placeholder: Int
    }

    type Mutation {
        placeholder: Int
    }
`;

const resolvers = {
    Query: {
        placeholder: () => 1,
    },
    Mutation: {
        placeholder: () => 1,
    },
};

export const config = modules.reduce(
    (acc, item) => ({
        ...acc,
        typeDefs: [...acc.typeDefs, item.typeDefs],
        resolvers: merge(acc.resolvers, item.resolvers),
    }),
    {
        typeDefs: [typeDef] as any[],
        resolvers: { ...resolvers },
        subscriptions: {},
        tracing: true,
    }
);

// Generate and export the schema
export const schema = config.typeDefs.reduce((acc, doc) => `${acc}\n${doc.loc.source.body}`, '');
