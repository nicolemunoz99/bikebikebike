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
  last_login BIGINT
);

CREATE TABLE IF NOT EXISTS bikes(
  strava_id INT REFERENCES strava (id),
  bike_id VARCHAR PRIMARY KEY,
  name VARCHAR,
  b_brand VARCHAR,
  b_model VARCHAR,
  description VARCHAR,
  frame_type VARCHAR,
  b_dist_at_add DECIMAL,
  b_time_at_add DECIMAL,
  dist_current DECIMAL,
  time_current DECIMAL,
  image_url VARCHAR,
  b_date_added BIGINT,
  b_status VARCHAR
);

CREATE TABLE IF NOT EXISTS parts(
  part_id SERIAL primary key NOT NULL,
  p_bike_id VARCHAR references bikes (bike_id),
  type VARCHAR,
  custom_type VARCHAR,
  p_brand VARCHAR,
  p_model VARCHAR,
  p_dist_at_add DECIMAL,
  p_time_at_add DECIMAL,
  lifespan_dist DECIMAL,
  lifespan_time DECIMAL,
  tracking_method VARCHAR,
  useage_metric VARCHAR,
  current_wear_method VARCHAR,
  current_wear_dist DECIMAL,
  current_wear_time DECIMAL,
  new_date BIGINT,
  p_date_added BIGINT,
  p_status VARCHAR
);