import "reflect-metadata";
import { createExpressServer, Action } from "routing-controllers";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { LessonController, TaskController } from "./controllers";

dotenv.config();
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const app = createExpressServer({
  controllers: [TaskController, LessonController],
  cors: true,
  validation: true,
  authorizationChecker: async (action: Action) => {
    const auth = action.request.headers.authorization?.split(" ")[1];
    if (!auth) return false;
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(auth);
    if (error || !user) return false;
    action.request.user = user;
    return true;
  },
  currentUserChecker: (action: Action) => action.request.user,
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
