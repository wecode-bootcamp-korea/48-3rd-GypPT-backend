-- migrate:up
ALTER TABLE users_memberships ADD trainer_id INT DEFAULT NULL AFTER membership_id;
ALTER TABLE users_memberships ADD CONSTRAINT users_memberships_trainer_id_fkey
FOREIGN KEY (trainer_id) REFERENCES users (id);

ALTER TABLE users_memberships DROP FOREIGN KEY users_memberships_user_id_fkey;
ALTER TABLE users_memberships CHANGE user_id member_id INT NOT NULL;
ALTER TABLE users_memberships ADD CONSTRAINT users_memberships_member_id_fkey
FOREIGN KEY (member_id) REFERENCES users (id);

-- migrate:down
ALTER TABLE users_memberships DROP FOREIGN KEY users_memberships_member_id_fkey;
ALTER TABLE users_memberships CHANGE member_id user_id INT;

ALTER TABLE users_memberships DROP FOREIGN KEY users_memberships_trainer_id_fkey;
ALTER TABLE users_memberships DROP trainer_id;