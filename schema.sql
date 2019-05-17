create table users (
    id serial primary key,
    first_name varchar(200),
    last_name varchar(200),
    email varchar(100),
    user_password varchar(200)
)

create table trips (
    id serial primary key,
    trip_city varchar(200),
    trip_state varchar(200),
    trip_country varchar(200),
    trip_date date,
    lat varchar(100),
    lon varchar(100),
    trip_details varchar(5000),
    trip_photos varchar(200),
    user_id integer references users(id)
)