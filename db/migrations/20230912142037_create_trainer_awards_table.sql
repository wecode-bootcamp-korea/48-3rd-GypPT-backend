-- migrate:up
CREATE TABLE trainer_awards (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  trainer_profile_id INT NOT NULL,
  content VARCHAR(500) NOT NULL,
  CONSTRAINT trainer_awards_trainer_profile_id_fkey FOREIGN KEY (trainer_profile_id) REFERENCES trainer_profiles (id)
);

-- migrate:down
DROP TABLE IF EXISTS trainer_awards;
