-- migrate:up
CREATE TABLE trainer_grades (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  emoji VARCHAR(500) NOT NULL
);
ALTER TABLE trainer_grades CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- migrate:down
DROP TABLE IF EXISTS trainer_grades;
