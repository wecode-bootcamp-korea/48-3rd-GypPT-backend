-- migrate:up
ALTER TABLE members_memberships DROP FOREIGN KEY users_memberships_member_id_fkey;
ALTER TABLE members_memberships DROP FOREIGN KEY users_memberships_membership_id_fkey;
ALTER TABLE members_memberships DROP FOREIGN KEY users_memberships_trainer_id_fkey;

ALTER TABLE members_memberships ADD CONSTRAINT members_memberships_member_id_fkey
FOREIGN KEY (member_id) REFERENCES users (id);
ALTER TABLE members_memberships ADD CONSTRAINT members_memberships_membership_id_fkey
FOREIGN KEY (membership_id) REFERENCES memberships (id);
ALTER TABLE members_memberships ADD CONSTRAINT members_memberships_trainer_id_fkey
FOREIGN KEY (trainer_id) REFERENCES users (id);

-- migrate:down
ALTER TABLE members_memberships DROP FOREIGN KEY members_memberships_member_id_fkey;
ALTER TABLE members_memberships DROP FOREIGN KEY members_memberships_membership_id_fkey;
ALTER TABLE members_memberships DROP FOREIGN KEY members_memberships_trainer_id_fkey;

ALTER TABLE members_memberships ADD CONSTRAINT users_memberships_member_id_fkey
FOREIGN KEY (member_id) REFERENCES users (id);
ALTER TABLE members_memberships ADD CONSTRAINT users_memberships_membership_id_fkey
FOREIGN KEY (membership_id) REFERENCES memberships (id);
ALTER TABLE members_memberships ADD CONSTRAINT users_memberships_trainer_id_fkey
FOREIGN KEY (trainer_id) REFERENCES users (id);
