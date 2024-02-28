-- migrate:up
CREATE TABLE trainer_profiles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  trainer_grade_id INT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  career VARCHAR(500) NOT NULL,
  awards VARCHAR(500),
  license VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT trainer_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT trainer_profiles_trainer_grade_id_fkey FOREIGN KEY (trainer_grade_id) REFERENCES trainer_grades (id)
);

-- migrate:down
DROP TABLE IF EXISTS trainer_profiles;
