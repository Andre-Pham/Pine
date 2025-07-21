# Pine
A basic full-stack application representing a simplified LMS scenario.

"Pine" is short for "Pineapple" because I like fruit.

## Getting started

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

## Misc

To lint and format:

*In the root of the project:*

```bash
npm run lint
```

```bash
npm run prettier
```

## Database

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

## Notes

#### Structure

The general gist of the application is there's two apps, `apps/frontend` and `apps/api` which both need to be run to access the application. `apps/frontend` is the frontend and has all the client-side components, rendering, API calls, auth, etc, while `apps/api` is the server-side API which the frontend makes requests to, and contains controllers which mutate and request data via the domain layer.

Going a bit deeper, we've got the two packages, `packages/contracts` and `packages/domain`. `packages/contracts` contains request/response types shared by the frontend and backend, as well as model types. `packages/domain` contains all our repositories for accessing the database layer and performing business logic.

#### Limitations

This application is a demonstration of how a basic LMS scenario could be implemented as a full-stack application using Next.js and Supabase, and hence is far-off what a fully built production-ready application should look like. Some considerable additions/changes missing are:

* Unit, integration, and E2E testing
* Staging and production configs so the app could actually be published
* CI/CD
* RLS
* A proper design system and accompanying components and styles
* Wrapper and adapter packages, e.g. an adapter package for Supabase and utilities like `generateUuid` so you can swap out packages if desired
* I'd setup the `domain` and `contracts` (and future) packages so be buildable so they can be built independently (I think a lot of the monorepo configuration could be cleaned up in general)
* Dependency injection via inversify would be really nice for scaling the application and making testing easier
* Probably lots of other things I'm not thinking of lol
