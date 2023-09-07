-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(100) UNIQUE NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_image` varchar(200) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `user_profiles` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `height` int NOT NULL,
  `weight` int NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(50) NOT NULL,
  `point` int NOT NULL,
  `grade` varchar(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `trainer_profiles` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `score` int NOT NULL,
  `career` varchar(500) NOT NULL,
  `awards` varchar(500),
  `license` varchar(500) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `payments` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `membership_id` int NOT NULL,
  `price` int NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `users_memberships` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `membership_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
);

CREATE TABLE `memberships` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(500) NOT NULL
);

CREATE TABLE `threads` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `thread_types_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `thread_types` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

CREATE TABLE `thread_image` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `thread_id` int NOT NULL,
  `image_url` varchar(200) NOT NULL
);

CREATE TABLE `exercises` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `creater_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image_url` varchar(200) NOT NULL,
  `weekday` varchar(50) NOT NULL,
  `checkbox` boolean NOT NULL DEFAULT false
);

CREATE TABLE `diets` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `creater_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `weekday` varchar(50) NOT NULL
);

CREATE TABLE `diet_images` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `diet_id` int NOT NULL,
  `image_url` varchar(200) NOT NULL
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `thread_id` int NOT NULL,
  `comment_types_id` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `selection` boolean NOT NULL DEFAULT false,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `comment_types` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

ALTER TABLE `threads` ADD FOREIGN KEY (`thread_types_id`) REFERENCES `thread_types` (`id`);

ALTER TABLE `diets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `exercises` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_memberships` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_profiles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `trainer_profiles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `threads` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`membership_id`) REFERENCES `memberships` (`id`);

ALTER TABLE `diet_images` ADD FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`);

ALTER TABLE `thread_image` ADD FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`comment_types_id`) REFERENCES `comment_types` (`id`);

ALTER TABLE `users_memberships` ADD FOREIGN KEY (`membership_id`) REFERENCES `memberships` (`id`);

ALTER TABLE `exercises` ADD FOREIGN KEY (`creater_id`) REFERENCES `users` (`id`);

ALTER TABLE `diets` ADD FOREIGN KEY (`creater_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`);


-- migrate:down



