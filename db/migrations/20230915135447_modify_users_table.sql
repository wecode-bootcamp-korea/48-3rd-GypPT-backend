-- migrate:up
ALTER TABLE users MODIFY COLUMN nickname varchar(100) NULL;


-- migrate:down

