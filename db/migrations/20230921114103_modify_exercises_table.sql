-- migrate:up
ALTER TABLE exercises MODIFY image_url varchar(500) NOT NULL;

-- migrate:down

