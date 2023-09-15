-- migrate:up
ALTER TABLE threads MODIFY title NULL;

-- migrate:down
ALTER TABLE threads MODIFY title NOT NULL;

