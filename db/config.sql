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

CREATE TABLE IF NOT EXISTS user_info(
  id INT REFERENCES strava (id),
  join_date BIGINT,
  last_login_date BIGINT
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
  b_time_at_add DECIMAL, -- seconds
  b_dist_current DECIMAL,
  b_time_current DECIMAL, -- seconds
  image_url VARCHAR,
  b_date_added BIGINT, -- ms
  b_status VARCHAR
);

CREATE TABLE IF NOT EXISTS parts(
  part_id SERIAL primary key NOT NULL,
  p_bike_id VARCHAR references bikes (bike_id),
  type VARCHAR,
  custom_type VARCHAR,
  p_brand VARCHAR,
  p_model VARCHAR,
  tracking_method VARCHAR,
  use_metric_dist BOOLEAN,
  use_metric_time BOOLEAN,
  use_metric_date BOOLEAN,
  new_at_add VARCHAR,
  new_date BIGINT,
  lifespan_dist DECIMAL,
  lifespan_time DECIMAL, -- seconds
  lifespan_date BIGINT, -- ms
  p_date_added BIGINT,  -- ms
  p_status VARCHAR
);

