-- migrate:up
ALTER TABLE threads ADD trainer_id INT NOT NULL

-- migrate:down

