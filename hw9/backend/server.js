import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './mongo'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import ChatBox from './resolvers/ChatBox';
import Subscription from './resolvers/Subscription';
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
