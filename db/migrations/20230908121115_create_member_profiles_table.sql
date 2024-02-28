-- migrate:up
CREATE TABLE member_profiles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  member_grade_id INT NOT NULL,
  height INT NOT NULL,
  weight INT NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(50) NOT NULL,
  point INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT member_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT member_profiles_member_grade_id_fkey FOREIGN KEY (member_grade_id) REFERENCES member_grades (id)
);

-- migrate:down
DROP TABLE IF EXISTS member_profiles;
