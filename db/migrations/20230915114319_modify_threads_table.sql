-- migrate:up
ALTER TABLE threads MODIFY title VARCHAR(100) NULL;

-- migrate:down
ALTER TABLE threads MODIFY title VARCHAR(100) NOT NULL;
