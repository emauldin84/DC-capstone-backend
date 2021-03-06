create table users (
    id serial primary key,
    first_name varchar(200),
    last_name varchar(200),
    email varchar(100),
    user_password varchar(200),
    photo_url VARCHAR(200)
);

create table trips (
    id serial primary key,
    trip_location varchar(500),
    trip_date date,
    lat varchar(100),
    lon varchar(100),
    trip_details text,
    -- trip_photos varchar(2000),
    trip_photos TEXT [],
    user_id integer references users(id)
);

create table photos (
    id serial primary key,
    trip_id integer references trips(id),
    photo_url varchar(200)
);