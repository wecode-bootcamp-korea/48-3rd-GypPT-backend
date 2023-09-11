-- migrate:up
ALTER TABLE users MODIFY password VARCHAR(100) NULL;
ALTER TABLE users ADD UNIQUE (nickname);

-- migrate:down
ALTER TABLE users MODIFY password VARCHAR(100) NOT NULL;