import { buildSchema } from 'graphql';

import { schema } from './src/config';

export default buildSchema(schema);
