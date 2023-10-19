-- migrate:up
ALTER TABLE users_memberships MODIFY start_date DATE NULL;
ALTER TABLE users_memberships MODIFY end_date DATE NULL;

-- migrate:down
ALTER TABLE users_memberships MODIFY end_date DATE NOT NULL;
ALTER TABLE users_memberships MODIFY start_date DATE NOT NULL;
