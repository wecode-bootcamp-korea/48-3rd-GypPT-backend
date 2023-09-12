-- migrate:up
RENAME TABLE users_memberships TO members_memberships;

-- migrate:down
RENAME TABLE members_memberships TO users_memberships;

