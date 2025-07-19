import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { TaskController } from './controllers/TaskController';

const app = createExpressServer({
  controllers: [TaskController],
  cors: true, // enable CORS for all origins by default (allow frontend calls)
  validation: true, // enable class-validator auto-validation
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
