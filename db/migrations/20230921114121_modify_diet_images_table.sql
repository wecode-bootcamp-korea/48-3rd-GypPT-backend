-- migrate:up
ALTER TABLE diet_images MODIFY image_url varchar(500) NOT NULL;

-- migrate:down

