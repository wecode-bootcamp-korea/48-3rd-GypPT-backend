-- migrate:up
ALTER TABLE member_profiles MODIFY point decimal(10,2) DEFAULT 1000000.00;

-- migrate:down

