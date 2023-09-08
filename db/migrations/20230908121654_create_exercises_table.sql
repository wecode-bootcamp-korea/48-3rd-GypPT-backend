-- migrate:up
CREATE TABLE exercises (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  member_id INT NOT NULL,
  trainer_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL,
  image_url VARCHAR(200) NOT NULL,
  weekday VARCHAR(50) NOT NULL,
  checkbox BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT exercises_member_id_fkey FOREIGN KEY (member_id) REFERENCES users (id),
  CONSTRAINT exercises_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE IF EXISTS exercises;
