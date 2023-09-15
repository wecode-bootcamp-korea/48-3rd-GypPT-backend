-- migrate:up
ALTER TABLE member_profiles MODIFY COLUMN height INT NULL;
ALTER TABLE member_profiles MODIFY COLUMN weight INT NULL;


-- migrate:down

