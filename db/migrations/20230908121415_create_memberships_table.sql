-- migrate:up
CREATE TABLE memberships (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  description VARCHAR(500) NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS memberships;
