-- migrate:up
CREATE TABLE membership_benefits (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  membership_id INT NOT NULL,
  content VARCHAR(500) NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS membership_benefits;
