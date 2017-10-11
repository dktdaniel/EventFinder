DROP DATABASE IF EXISTS eventfinder;

CREATE DATABASE eventfinder;

USE eventfinder;

CREATE TABLE venues (
  givenId VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(200) NOT NULL,
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

CREATE TABLE favvenues (
  id int AUTO_INCREMENT NOT NULL,
  userId VARCHAR(25),
  venueId VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (venueId) REFERENCES venues(givenId)
);

CREATE TABLE schedule (
  id int AUTO_INCREMENT NOT NULL,
  userId VARCHAR(200),
  eventId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (eventId) REFERENCES events(id)
);