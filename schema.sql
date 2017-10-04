DROP DATABASE IF EXISTS Occa;

CREATE DATABASE Occa;

USE Occa;

CREATE TABLE venues (
  givenId VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  url TEXT,
  postalCode VARCHAR(200) NOT NULL,
  image TEXT,
  PRIMARY KEY (givenId)
);

CREATE TABLE events (
  id INT AUTO_INCREMENT NOT NULL,
  givenId VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  startDate DATE NOT NULL,
  startTime TIME NOT NULL,
  image TEXT,
  category VARCHAR(200),
  url TEXT,
  venueId VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (venueId) REFERENCES venues(givenId)
);

-- INSERT INTO venues(givenId, name, lat, lng, url, postalCode, image)
--   VALUES ("KovZpaKope", "Bill Graham Civic Auditorium", 37.778479, 
--   -122.417473, "url", "94102", 
--   "imageUrl");

-- INSERT INTO events(name, startDate, startTime, image, category, url, venueId) VALUES
--   ("Zedd", "2017-10-07", "20:00:00", "imageUrl",
--   "Music", "url", "KovZpaKope");