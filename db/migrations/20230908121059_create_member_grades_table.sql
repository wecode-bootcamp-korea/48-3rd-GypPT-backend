-- migrate:up
CREATE TABLE member_grades (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  emoji VARCHAR(500) NOT NULL
);
ALTER TABLE member_grades CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- migrate:down
DROP TABLE IF EXISTS member_grades;
