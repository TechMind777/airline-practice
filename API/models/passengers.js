
const addPassengers = async function (passengers) {

  try {
    console.log("passengers", passengers)

    const lengthObj = Object.keys(passengers).length;

    return await new Promise((resolve, reject) => {
      dbConnection.all(
        `INSERT INTO passengers (${Object.keys(passengers).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
        Object.values(passengers),
        (err, data) => {
          console.log("data--", err, data, this.lastID);
          if (err) {
            console.error("Error inserting passengers:", err);
            reject(err);
          } else {

            dbConnection.get("SELECT * FROM sqlite_sequence WHERE name= ? ", ['passengers'], (err, row) => {
              if (err) {
                console.log('Error', err)
                resolve(true);

              } else {
                console.info("Passenger inserted with ID:", row.seq);
                resolve(row.seq);
              }

            });
          }
        }
      );
    });
  } catch (err) {
    console.log("Rtot", err.message | err)
    throw err;
  }
};

// Define the getFlights function
const getPassengers = async function (params) {
  try {

    let conVAl = [];
    let sql = `SELECT p.*, 
    s.id seat_id, 
    s.seat_number, s.is_checked_in, s.shop_requests, s.ancillary_services, s.meal_preferences , s.flight_id,
    an.service_name as ancillary_services_name
    FROM passengers p join seats s on p.id= s.passenger_id 
    LEFT JOIN ancillary_services  an on an.id =  s.ancillary_services
    WHERE 1=1 `;
    if (params?.name) {
      sql += `and p.name LIKE ?`;
      conVAl.push(`%${params.name}%`);
    }
    if (Number(params?.requires_wheelchair) == 1) {
      sql += ` and p.requires_wheelchair = ? `;
      conVAl.push(params.requires_wheelchair);
    }
    if (Number(params?.has_infant) == 1) {
      sql += ` and p.has_infant = ?`;
      conVAl.push(params.has_infant);
    }
    if (Number(params?.is_checked_in) == 0 && Number(params?.is_checked_in) == 1) {
      sql += ` and p.is_checked_in = ? `;
      conVAl.push(params.is_checked_in);
    }
    
    if (Number(params?.is_checked_in) == 0 && Number(params?.is_checked_in) == 1) {
      sql += ` and p.is_checked_in = ? `;
      conVAl.push(params.is_checked_in);
    }

    

    if ( params?.flight_id) {
      sql += ` and s.flight_id = ? `;
      conVAl.push(params.flight_id);
    }
     
    console.log('------>',params?.passport_mis)
    if ( Number( params?.passport_mis)) {
      sql += ` and (p.passport IS NULL OR p.passport = '') `; 
    }
    if (Number(params?.address_mis) ) {
      sql += ` and (p.address IS NULL OR p.address = '') `; 
      // sql += `and p.address = ?`;
      // conVAl.push(params.address_mis);
    }
    if (Number(params?.date_of_birth) == 1) {
      sql += ` and (p.date_of_birth IS NULL OR p.date_of_birth = '') `;
      // sql += `and p.date_of_birth = ?`;
      // conVAl.push(params.date_of_birth);
    }
    // sql += "1=1";

    // Add pagination
    let next = false;
    const page = Number(params.page || 1);
    let pre = page == 1 ? false : true;
    let limit = Number(params.limit || 5) + 1;
    const offset = (page - 1) * (limit - 1);

    sql += ` LIMIT ? OFFSET ? `;
    conVAl.push(limit, offset);

    console.log('query:', sql, conVAl);

    return await new Promise((resolve, reject) => {
      dbConnection.all(sql, conVAl, (err, row) => {
        if (err) {
          console.error("Error fetching passengers:", err);
          reject(err);
        } else {
 
          if (params.limit < row.length) {
            next = true;

            row.pop();

          }
          resolve({ row, page: page, limit: limit - 1, pre, next });
        }
      });
    });

  } catch (err) {
    throw err;
  }
};

// Define the updateFlights function
const updatePassengers = async function (passengersId, params) {
  try {
    console.log("passengersId, params", passengersId, params)
    let conVals = [];
    let setClause = "";

    // Generate SET clause dynamically based on params
    Object.keys(params).forEach((key, index) => {

      setClause += `${key} = ?`;

      conVals.push(params[key]);

      if (index !== Object.keys(params).length - 1) {
        setClause += ", ";
      }

    });

    // Add passengersId to the conVals array
    conVals.push(passengersId);

    // Execute the UPDATE query
    await new Promise((resolve, reject) => {
      dbConnection.run(
        `UPDATE passengers SET ${setClause} WHERE id = ?`,
        conVals,
        (err) => {
          if (err) {
            console.error("Error updating passengers:", err);
            reject(err);
          } else {
            console.info("Flights updated");
            resolve(true);
          }
        }
      );
    });

  } catch (err) {
    throw err;
  }
};


module.exports = { addPassengers, getPassengers, updatePassengers }