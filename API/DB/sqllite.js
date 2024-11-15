// db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { addUser } = require("../models/users");
const { addFlights } = require("../models/flights");

const bcrypt = require('bcrypt');

// let dbConnection;
// Function to establish SQLite database connection
function connectDatabase() {
  const dbPath = path.resolve(__dirname, "db_sqlite", "database.db");

  global.dbConnection = new sqlite3.Database(dbPath);

  // Create a table (if not exists)
  dbConnection.serialize(() => {

    // -- Create tags
    dbConnection.run(
      `
        CREATE TABLE tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tags TEXT NOT NULL,
            description TEXT NOT NULL
        );
  `  ,
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table flights created");
          // insertTags()

        }
      }
    );
    // -- Create roles
    dbConnection.run(
      `
        CREATE TABLE roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            tags TEXT NOT NULL
        );
    `  ,
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table roles created");
          // insertRole()

        }
      }
    );


    // -- Create user
    dbConnection.run(
      `CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_type TEXT NOT NULL CHECK(user_type IN ('admin', 'staff')),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role_id INTEGER NOT NULL
      );

    `  ,
      (err, result, r) => {
        //  insertUser();

        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table user created");
          insertUser();
        }
      }
    );

    // -- Create flights table
    dbConnection.run(
      `
      CREATE TABLE flights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        flight_number TEXT NOT NULL,
        flight_name TEXT NOT NULL,
        departure_time TEXT NOT NULL,
        arrival_time TEXT NOT NULL,
        departure_airport TEXT NOT NULL,
        arrival_airport TEXT NOT NULL
      );
`  ,
      (err, result, r) => {
        // insertFlights();
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table flights created");
          insertFlights()

        }
      }
    );

    // dbConnection.run('DROP TABLE passengers;')

    // --Create passengers table
    dbConnection.run(
      `  
        CREATE TABLE passengers(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL, 
          requires_wheelchair INTEGER DEFAULT 0,
          has_infant INTEGER DEFAULT 0,
          passport TEXT  NULL, 
          address TEXT  NULL, 
          date_of_birth TEXT  NULL

        );`,
      (err, result, r) => {
        // insertPessenger()

        if (err) {

          console.error("error passengers:", err.message);
          return;
        } else {
          insertPessenger()
          console.info("Table passengers created");

        }
      }
    );

    // dbConnection.run('DROP TABLE seats;')

    // --Create seats table
    dbConnection.run(
      ` CREATE TABLE seats(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          flight_id INTEGER NOT NULL,
          seat_number TEXT NOT NULL,
          is_checked_in INTEGER DEFAULT 0,
          passenger_id INTEGER,
          shop_requests INTEGER DEFAULT 0,
          ancillary_services INTEGER DEFAULT 0,
          meal_preferences INTEGER DEFAULT 0

        ); `  ,

      // FOREIGN KEY(flight_id) REFERENCES flights(id),
      // FOREIGN KEY(passenger_id) REFERENCES passengers(id)
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          insertPessengersheetBooked()
          console.info("Table seats created");

        }
      }
    );
   
    // dbConnection.run('DROP TABLE ancillary_services;')
    // dbConnection.run('DROP TABLE meal_preferences;')
    // --Create ancillary_services table
    dbConnection.run(
      ` CREATE TABLE ancillary_services(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          service_name TEXT NOT NULL, 
          description TEXT NOT NULL, 
          price INTEGER NOT NULL
        );
 `  ,
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table passenger_ancillary_services created");
          insertAncillaryServices()
          // 
        }
      }
    );

    // --Create meal preferences table
    dbConnection.run(
      ` 
      CREATE TABLE meal_preferences(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meal_type TEXT NOT NULL, 
        description TEXT NOT NULL, 
        price  INTEGER NOT NULL
        ); `  ,
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table meal_preferences created");
          insertMealPreferences()
        }
      }
    );

    // --Create in -flight shop requests table
    dbConnection.run(
      ` 
      CREATE TABLE in_flight_shop_requests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        passenger_id INTEGER NOT NULL,
        request_details TEXT NOT NULL,
        FOREIGN KEY(passenger_id) REFERENCES passengers(id)
      ); `  ,
      (err, result, r) => {
        if (err) {
          console.error("error", err.message);
          return;
        } else {
          console.info("Table in_flight_shop_requests created");

        }
      }
    );

  });

  return dbConnection;
}

// connectDatabase()
async function insertUser() {
  let password = '123456';

  let hasPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));

  addUser({
    user_type: 'admin',
    name: 'Lti Admin',
    email: 'admin@ltimindtree.com',
    password: hasPassword,
    role_id: '1'
  });

  addUser({
    user_type: 'staff',
    name: 'Lti Staff',
    email: 'staff@ltimindtree.com',
    password: hasPassword,
    role_id: 2
  });
}

function insertTags() {
  console.log("insert", 'Tags');
  return addUser({
    tag: 'admin',
  });
}

function insertRole() {
  console.log("insert", 'Tags');
  addUser({
    role: 'admin',
    tags: ['tag_user'],
  });
  addUser({
    role: 'staff',
    tags: ['tag_user'],
  });
}

function insertFlights() {
  console.log("insertFlights")
  addFlights({
    "flight_number": "AA101",
    "flight_name": "American Airlines",
    "departure_time": "2024-11-01 08:00:00",
    "arrival_time": "2024-11-01 12:00:00",
    "departure_airport": "JFK",
    "arrival_airport": "LAX"
  })
  addFlights(
    {
      "flight_number": "BA202",
      "flight_name": "British Airways",
      "departure_time": "2024-11-01 09:00:00",
      "arrival_time": "2024-11-01 13:00:00",
      "departure_airport": "LHR",
      "arrival_airport": "JFK"
    })
  addFlights({
    "flight_number": "DL303",
    "flight_name": "Delta Airlines",
    "departure_time": "2024-11-01 10:00:00",
    "arrival_time": "2024-11-01 14:00:00",
    "departure_airport": "ATL",
    "arrival_airport": "ORD"
  })
  addFlights(
    {
      "flight_number": "UA404",
      "flight_name": "United Airlines",
      "departure_time": "2024-11-01 11:00:00",
      "arrival_time": "2024-11-01 15:00:00",
      "departure_airport": "SFO",
      "arrival_airport": "SEA"
    })
  addFlights(
    {
      "flight_number": "AF505",
      "flight_name": "Air France",
      "departure_time": "2024-11-01 12:00:00",
      "arrival_time": "2024-11-01 16:00:00",
      "departure_airport": "CDG",
      "arrival_airport": "JFK"
    })

}

function insertPessenger() {

  dbConnection.all(
    `INSERT INTO Passengers (name, email, requires_wheelchair, has_infant) VALUES
    ('John Doe', 'john.doe@example.com', 0, 1),
    ('Jane Smith', 'jane.smith@example.com', 1, 0),
    ('Alice Johnson', 'alice.johnson@example.com', 0, 0),
    ('Bob Brown', 'bob.brown@example.com', 1, 1),
    ('Charlie Davis', 'charlie.davis@example.com', 0, 0);`, [], (err, row) => {
    if (err) {
      console.error("Add Passengers:", err);
    } else {
      console.info("inset Passengers:",);

    }
  });
}

function insertPessengersheetBooked() {

  dbConnection.all(
    `INSERT INTO seats (flight_id, seat_number, is_checked_in, passenger_id) VALUES
    (1, '12', 1, 1),
    (1  , '14', 0, 2),
    (3, '15', 1, 3),
    (4, '16', 0, 4),
    (5, '18', 1, 5);`, [], (err, row) => {
    if (err) {
      console.error("Add seats:", err);
    } else {
      console.info("inset seats:",);

    }
  });
}


function insertAncillaryServices() {

  dbConnection.all(
    `INSERT INTO ancillary_services ( service_name, description, price)
        VALUES ('Extra Baggage', 'Allows an additional 20kg of baggage', 50),
       ('Priority Boarding', 'Priority boarding and security check', 30),
       ( 'Lounge Access', 'Access to the airport lounge', 40);`, [], (err, row) => {
    if (err) {
      console.error("fail ancillary_services:", err);
    } else {
      console.info("inset ancillary_services:",);

    }
  });
}
function insertMealPreferences() {

  dbConnection.all(
    `INSERT INTO meal_preferences (  meal_type, description, price)
        VALUES ('Vegetarian', 'A vegetarian meal option', 10),
       ('Non-Vegetarian', 'A non-vegetarian meal option', 15),
       (  'Vegan', 'A vegan meal option', 12),
       (  'Gluten-Free', 'A gluten-free meal option', 12);`, [], (err, row) => {
    if (err) {
      console.error("Fail meal_preferences:", err);
    } else {
      console.info("inset meal_preferences:",);

    }
  });
}
module.exports = { connectDatabase };