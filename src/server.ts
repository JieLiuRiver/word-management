import '@/db';
import '@/db/seed';
import { App } from '@/app';
import { AuthRoute } from '@/routes/auth.route';
import { UserRoute } from '@/routes/users.route';
import { CardsRoute } from '@/routes/cards.route';

const app = new App([new UserRoute(), new AuthRoute(), new CardsRoute()]);

app.listen();
