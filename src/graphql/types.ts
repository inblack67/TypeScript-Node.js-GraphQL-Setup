import { objectType } from 'nexus';

export const MessageType = objectType({
  name: 'Message',
  definition(t) {
    t.id('id'), t.string('content');
  },
});
