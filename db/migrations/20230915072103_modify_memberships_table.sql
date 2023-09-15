-- migrate:up
ALTER TABLE memberships ADD membership_benefit_id INT NOT NULL;
ALTER TABLE memberships ADD CONSTRAINT memberships_membership_benefit_id_fkey
FOREIGN KEY (membership_benefit_id) REFERENCES membership_benefits (id);

-- migrate:down
ALTER TABLE memberships DROP FOREIGN KEY memberships_membership_benefit_id_fkey;
ALTER TABLE memberships DROP membership_benefit_id;