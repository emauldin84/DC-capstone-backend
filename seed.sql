-- dummy data for testing

INSERT into users(first_name, last_name, email, user_password)
VALUES ('Eric', 'Mauldin', 'eric@test.com', 'test'),
('Caitie', 'Cirou', 'caitie@test.com', 'test'),
('Koa', 'Cirou', 'koa@test.com', 'test')

INSERT into trips(trip_city, trip_state, trip_country, trip_date, lat, lon, trip_details, trip_photos, user_id)
VALUES ('Atlanta', 'Georgia', 'United States', '2013-06-01', '33.7490', '84.3880', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'file/path/goes/here', 1),

('Paris', null, 'France', '2020-12-25', '48.85658', '2.35183', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'file/path/goes/here', 3),

('Tokyo', null, 'Japan', '2016-01-01', '35.68', '139.77', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'file/path/goes/here', 2)