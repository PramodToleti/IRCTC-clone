CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user'))
);

CREATE TABLE IF NOT EXISTS Trains (
    id SERIAL PRIMARY KEY,
    train_name VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    seat_capacity INT NOT NULL,
    available_seats INT NOT NULL,
    arrival_time_at_source VARCHAR(100) NOT NULL,
    arrival_time_at_destination VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    train_id INT NOT NULL,
    no_of_seats INT NOT NULL,
    seat_numbers TEXT[] NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (train_id) REFERENCES Trains(id)
);
