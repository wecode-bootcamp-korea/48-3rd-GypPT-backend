-- migrate:up
CREATE TABLE diets (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  member_id INT NOT NULL,
  trainer_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL,
  weekday VARCHAR(50) NOT NULL,
  CONSTRAINT diets_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES users (id),
  CONSTRAINT diets_member_id_fkey FOREIGN KEY (member_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE IF EXISTS diets;
