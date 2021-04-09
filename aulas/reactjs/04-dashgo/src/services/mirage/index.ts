import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(serverMirage) {
      serverMirage.createList('user', 10);
    },
    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.get('/post');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
