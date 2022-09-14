import App from '@/app';
import AcronymRoute from '@routes/acronym.route';
import validateEnv from '@utils/validateEnv';
import { readJSON } from './backup/acronym.model';

validateEnv();

const app = new App([new AcronymRoute()]);

app.connectDB();
app.listen();
// readJSON();
