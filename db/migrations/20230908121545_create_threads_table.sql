-- migrate:up
CREATE TABLE threads (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  thread_types_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT threads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT threads_thread_types_id_fkey FOREIGN KEY (thread_types_id) REFERENCES thread_types (id)
);

-- migrate:down
DROP TABLE IF EXISTS threads;
