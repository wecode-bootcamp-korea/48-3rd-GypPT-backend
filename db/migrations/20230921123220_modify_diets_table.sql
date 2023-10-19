-- migrate:up
ALTER TABLE diets ADD checkbox tinyint(1) NOT NULL DEFAULT 0;

-- migrate:down
