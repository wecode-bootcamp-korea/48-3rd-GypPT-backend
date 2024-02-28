-- migrate:up
CREATE TABLE payments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  membership_id INT NOT NULL,
  price INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT payments_membership_id_fkey FOREIGN KEY (membership_id) REFERENCES memberships (id)
);

-- migrate:down
DROP TABLE IF EXISTS payments;
