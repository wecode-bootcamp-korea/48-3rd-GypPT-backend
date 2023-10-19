-- migrate:up
ALTER TABLE payments ADD payments_method_id INT NOT NULL AFTER membership_id;
ALTER TABLE payments ADD CONSTRAINT payments_payments_method_id_fkey
FOREIGN KEY (payments_method_id) REFERENCES payments_method (id);

-- migrate:down
ALTER TABLE payments DROP FOREIGN KEY payments_payments_method_id_fkey;
ALTER TABLE payments DROP payments_method_id;
