The backend will be running on port:5050

For the backend installation
1. git clone
2. import the postgresql database
3. cd backend
4. npm install
5. nodemon index

#---- CREATE DATABASE AND TABLE -----#
CREATE DATABASE api;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200)
);
