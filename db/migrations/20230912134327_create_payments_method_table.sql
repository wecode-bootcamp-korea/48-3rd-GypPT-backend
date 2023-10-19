-- migrate:up
CREATE TABLE payments_method (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	method VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS payments_method;
