import { makeSchema, mutationType, queryType, stringArg } from 'nexus';
import path from 'path';
import { IContext } from '../interfaces';
import { MessageType } from './types';

const Mutation = mutationType({
  definition(t) {
    t.field('addMessage', {
      type: MessageType,
      args: {
        content: stringArg({}),
      },
      resolve: async (_, { content }: { content: string }, ctx: IContext) => {
        const newMessage = await ctx.prisma.message.create({
          data: { content },
        });
        return newMessage;
      },
    });
  },
});

const Query = queryType({
  definition(t) {
    t.field('hello', {
      type: 'String',
      resolve: () => 'worlds',
    });
    t.list.field('messages', {
      type: MessageType,
      resolve: async (_, __, ctx: IContext) => {
        const messages = await ctx.prisma.message.findMany();
        return messages;
      },
    });
  },
});

export const getSchema = () => {
  const schema = makeSchema({
    types: { Query, MessageType, Mutation },
    outputs: {
      schema: path.join(process.cwd(), 'nexus/schema.graphql'),
      typegen: path.join(process.cwd(), 'nexus/nexus.ts'),
    },
  });
  return schema;
};
