-- migrate:up
ALTER TABLE diets ADD checkbox BOOLEAN NOT NULL DEFAULT false;

-- migrate:down
ALTER TABLE diets DROP COLUMN checkbox;
