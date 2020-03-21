DROP DATABASE bbb;

CREATE DATABASE bbb;
\c bbb;

CREATE TABLE IF NOT EXISTS strava(
  id INT PRIMARY KEY,
  username VARCHAR,
  token_type VARCHAR,
  access_token VARCHAR,
  expires_at INT,
  expires_in INT,
  refresh_token VARCHAR,
  scope VARCHAR
);

CREATE TABLE IF NOT EXISTS userInfo(
  id INT REFERENCES strava (id),
  join_date BIGINT,
  measurement_preference VARCHAR,
  last_ride_id INT
);

CREATE TABLE IF NOT EXISTS bikes(
  strava_id INT REFERENCES strava (id),
  id VARCHAR PRIMARY KEY,
  name VARCHAR,
  brand_name VARCHAR,
  model_name VARCHAR,
  description VARCHAR,
  frame_type VARCHAR,
  dist_on_add DECIMAL,
  dist_current DECIMAL,
  time_on_add DECIMAL,
  time_current DECIMAL,
  image_url VARCHAR,
  date_added BIGINT
);

CREATE TABLE IF NOT EXISTS parts(
  id SERIAL primary key NOT NULL,
  bike_id VARCHAR references bikes (id),
  date_added BIGINT,
  type VARCHAR,
  custom_type VARCHAR,
  brand VARCHAR,
  model VARCHAR,
  dist_at_add DECIMAL,
  time_at_add DECIMAL,
  lifespan_dist DECIMAL,
  lifespan_time DECIMAL,
  tracking_method VARCHAR,
  useage_metric VARCHAR,
  current_wear_method VARCHAR,
  current_wear_dist DECIMAL,
  current_wear_time DECIMAL,
  new_date BIGINT
);