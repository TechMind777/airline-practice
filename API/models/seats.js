// Define the addSeats function
module.exports.addSeats = async function (sheet) {

  const lengthObj = Object.keys(sheet).length;
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.run(
        `INSERT INTO seats (${Object.keys(sheet).toString()}) 
               VALUES 
                  (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
        Object.values(sheet),
        (err, data) => {
          console.log("data--", err, data);
          if (err) {
            console.error("Error inserting sheet:", err);
            reject(err);
          } else {
            console.info("Seats inserted");
            resolve(true);
          }
        }
      );
    });
  } catch (err) {
    throw err;
  }
};

// Define the getSeats function
module.exports.getSeats = async function (params) {
  try {
    console.log("params---", params)
    let conVAl = [];
    let sql = `SELECT 
    s.id AS booking_id,
    s.seat_number,
    s.is_checked_in,

    p.name AS passenger_name,
    p.email AS passenger_email,
    p.requires_wheelchair,
    p.has_infant,
    
    f.flight_number,
    f.flight_name,
    f.departure_time,
    f.arrival_time,
    f.departure_airport,
    f.arrival_airport

FROM 
    seats s
JOIN 
    passengers p ON s.passenger_id = p.id
JOIN 
    flights f ON s.flight_id = f.id WHERE 1=1 `;

    if (params?.flight_id) {
      sql += ` and s.flight_id = ? `;
      conVAl.push(params.flight_id);
    }

    console.log('query:', sql);

    return await new Promise((resolve, reject) => {
      dbConnection.all(sql, conVAl, (err, row) => {
        if (err) {
          console.error("Error fetching sheet:", err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

  } catch (err) {
    throw err;
  }
};

// Define the updateSeats function
module.exports.updateSeats = async function (sheetId, params) {
  try {
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

    // Add sheetId to the conVals array
    conVals.push(sheetId);

    // Execute the UPDATE query
    await new Promise((resolve, reject) => {
      dbConnection.run(
        `UPDATE seats SET ${setClause} WHERE id = ?`,
        conVals,
        (err) => {
          if (err) {
            console.error("Error updating sheet:", err);
            reject(err);
          } else {
            console.info("Seats updated");
            resolve(true);
          }
        }
      );
    });

  } catch (err) {
    throw err;
  }
};

// Define the getSeatsBySeatsnameAndPassword function
module.exports.getSeatsBySeatsnameAndPassword = async function (sheetname, password) {
  try {
    const sheet = await new Promise((resolve, reject) => {
      dbConnection.get(
        "SELECT * FROM seats WHERE email = ? AND password = ?",
        [sheetname, password],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
    return sheet;
  } catch (err) {
    throw err;
  }
};