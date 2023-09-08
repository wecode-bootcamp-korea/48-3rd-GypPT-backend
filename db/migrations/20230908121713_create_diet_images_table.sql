-- migrate:up
CREATE TABLE diet_images (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  diet_id INT NOT NULL,
  image_url VARCHAR(200) NOT NULL,
  CONSTRAINT diet_images_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES diets (id)
);

-- migrate:down
DROP TABLE IF EXISTS diet_images;
