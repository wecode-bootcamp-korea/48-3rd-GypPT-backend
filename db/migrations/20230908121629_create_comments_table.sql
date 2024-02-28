-- migrate:up
CREATE TABLE comments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  thread_id INT NOT NULL,
  comment_types_id INT NOT NULL,
  content VARCHAR(500) NOT NULL,
  selection BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT comments_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES threads (id),
  CONSTRAINT comments_comment_types_id_fkey FOREIGN KEY (comment_types_id) REFERENCES comment_types (id),
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE IF EXISTS comments;
