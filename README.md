# Pine
A basic full-stack application representing a simplified LMS scenario.

"Pine" is short for "Pineapple" because I like fruit.

#### Getting started

Add your supabase details to:

* `apps/api/.env.local`
* `apps/frontend/.env.local`

Build the project.

*In the root of the project:*

```bash
npm i
```

```bash
npm run build
```

*In the frontend, `/apps/frontend`:*

```bash
npm run dev
```

*In the api, `/apps/api`:*

```
npm run dev
```

The app will now be running.

#### Misc

To lint and format:

*In the root of the project:*

```bash
npm run lint
```

```bash
npm run prettier
```

#### Database

Schema:

```postgresql
CREATE TABLE lesson(
    id UUID NOT NULL,
    user_id UUID NOT NULL,
    lesson_name VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT lesson_pk PRIMARY KEY (id)
);
```

Sample data:

```postgresql
INSERT INTO lesson (id, user_id, lesson_name, created_at, completed_at, deleted_at) 
VALUES (gen_random_uuid(), gen_random_uuid(), 'My lesson', NOW(), NULL, NULL);
```

