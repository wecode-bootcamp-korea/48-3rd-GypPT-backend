-- migrate:up
ALTER TABLE trainer_profiles DROP career;
ALTER TABLE trainer_profiles DROP license;
ALTER TABLE trainer_profiles DROP awards;

-- migrate:down
ALTER TABLE trainer_profiles ADD award VARCHAR(500) DEFAULT NULL;
ALTER TABLE trainer_profiles ADD license VARCHAR(500) NOT NULL;
ALTER TABLE trainer_profiles ADD career VARCHAR(500) NOT NULL;
