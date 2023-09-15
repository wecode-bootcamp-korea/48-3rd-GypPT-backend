-- migrate:up
ALTER TABLE threads ADD trainer_profile_id INT NULL;
ALTER TABLE threads ADD FOREIGN KEY(trainer_profile_id) REFERENCES trainer_profiles(id);

-- migrate:down


