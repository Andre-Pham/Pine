DROP TABLE IF EXISTS lesson;

CREATE TABLE lesson(
    id UUID NOT NULL,
    user_id UUID NOT NULL,
    lesson_name VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT lesson_pk PRIMARY KEY (id)
);