-- migrate:up
CREATE TABLE thread_types (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS thread_types;