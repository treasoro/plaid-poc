CREATE DATABASE treasoro;

CREATE TABLE public.users (
    id BIGSERIAL PRIMARY KEY, 
    username text NOT NULL
);

CREATE TABLE public.items (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    access_token TEXT NOT NULL,
    transaction_cursor TEXT,
    bank_name TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY(user_id) REFERENCES users(id)
)

-- DROP TABLE users;

-- make a column autoincrement
CREATE SEQUENCE temp_id_seq;
ALTER TABLE users ALTER COLUMN id SET NOT NULL;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('temp_id_seq');
ALTER SEQUENCE temp_id_seq OWNED BY users.id;

CREATE SEQUENCE temp_id_seq;
ALTER TABLE items ALTER COLUMN id SET NOT NULL;
ALTER TABLE items ALTER COLUMN id SET DEFAULT nextval('temp_id_seq');
ALTER SEQUENCE temp_id_seq OWNED BY items.id;

-- DELETE FROM users WHERE id = 2;

SELECT * FROM users;