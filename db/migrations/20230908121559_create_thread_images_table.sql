-- migrate:up
CREATE TABLE thread_images (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  thread_id INT NOT NULL,
  image_url VARCHAR(200) NOT NULL,
  CONSTRAINT thread_images_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES threads (id)
);

-- migrate:down
DROP TABLE IF EXISTS thread_images;
