-- migrate:up
CREATE TABLE users_memberships (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  membership_id INT NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  CONSTRAINT users_memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT users_memberships_membership_id_fkey FOREIGN KEY (membership_id) REFERENCES memberships (id)
);

-- migrate:down
DROP TABLE IF EXISTS users_memberships;
