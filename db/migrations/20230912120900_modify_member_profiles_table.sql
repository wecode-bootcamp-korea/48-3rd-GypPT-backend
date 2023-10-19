-- migrate:up
ALTER TABLE member_profiles MODIFY COLUMN member_grade_id int DEFAULT 1 NOT NULL;


-- migrate:down

