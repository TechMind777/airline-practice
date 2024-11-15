// Define the addFlights function
module.exports.addFlights = async function (role) {
 
    const lengthObj = Object.keys(role).length;
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.run(
          `INSERT INTO flights (${Object.keys(role).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
          Object.values(role),
          (err, data) => {
            console.log("data--" , err, data);
            if (err) {
              console.error("Error inserting flights:", err);
              reject(err);
            } else {
              console.info("Flights inserted");
              resolve(true);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getFlights function
  module.exports.getFlights = async function (params) {
    try {
      let conVAl = [];
      let sql = `SELECT * FROM flights WHERE 1=1 `;
      if (params.departure_time_start) {
        sql += ` AND (departure_time BETWEEN ? AND ?)`
        // sql += ` AND DATE(departure_time) = DATE(?)`;
        conVAl.push(params.departure_time_start);
        conVAl.push(params.departure_time_end);
      }
      console.log("sql", sql, conVAl)
      return await new Promise((resolve, reject) => {
        dbConnection.all(sql, conVAl, (err, row) => {
          if (err) {
            console.error("Error fetching flights:", err);
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
  
  // Define the updateFlights function
  module.exports.updateFlights = async function (roleId, params) {
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
  
      // Add roleId to the conVals array
      conVals.push(roleId);
  
      // Execute the UPDATE query
      await new Promise((resolve, reject) => {
        dbConnection.run(
          `UPDATE flights SET ${setClause} WHERE id = ?`,
          conVals,
          (err) => {
            if (err) {
              console.error("Error updating flights:", err);
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
  
  // Define the getFlightsByFlightsnameAndPassword function
  module.exports.getFlightsByFlightsnameAndPassword = async function (rolename, password) {
    try {
        const role = await new Promise((resolve, reject) => {
            dbConnection.get(
                "SELECT * FROM flights WHERE email = ? AND password = ?",
                [rolename, password],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
        return role;
    } catch (err) {
        throw err;
    }
  };