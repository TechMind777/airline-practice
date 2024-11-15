// Define the addPassengerAncillaryServices function
module.exports.addPassengerAncillaryServices = async function (passenger_ancillary_services) {
 
    const lengthObj = Object.keys(passenger_ancillary_services).length;
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.run(
          `INSERT INTO passenger_ancillary_services (${Object.keys(passenger_ancillary_services).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
          Object.values(passenger_ancillary_services),
          (err, data) => {
            console.log("data--" , err, data);
            if (err) {
              console.error("Error inserting passenger_ancillary_services:", err);
              reject(err);
            } else {
              console.info("PassengerAncillaryServices inserted");
              resolve(true);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getPassengerAncillaryServices function
  module.exports.getPassengerAncillaryServices = async function (params) {
    try {
      let conVAl = [];
      let sql = `SELECT * FROM passenger_ancillary_services WHERE `;
      if (params?.id) {
        sql += `id = ?`;
        conVAl.push(params.id);
      }
      sql += "1=1";
  
      console.log('query:', sql);
  
      return await new Promise((resolve, reject) => {
        dbConnection.all(sql, conVAl, (err, row) => {
          if (err) {
            console.error("Error fetching passenger_ancillary_services:", err);
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
  
  // Define the updatePassengerAncillaryServices function
  module.exports.updatePassengerAncillaryServices = async function (passenger_ancillary_servicesId, params) {
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
  
      // Add passenger_ancillary_servicesId to the conVals array
      conVals.push(passenger_ancillary_servicesId);
  
      // Execute the UPDATE query
      await new Promise((resolve, reject) => {
        dbConnection.run(
          `UPDATE passenger_ancillary_services SET ${setClause} WHERE id = ?`,
          conVals,
          (err) => {
            if (err) {
              console.error("Error updating passenger_ancillary_services:", err);
              reject(err);
            } else {
              console.info("PassengerAncillaryServices updated");
              resolve(true);
            }
          }
        );
      });
  
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getPassengerAncillaryServicesByPassengerAncillaryServicesnameAndPassword function
  module.exports.getPassengerAncillaryServicesByPassengerAncillaryServicesnameAndPassword = async function (passenger_ancillary_servicesname, password) {
    try {
        const passenger_ancillary_services = await new Promise((resolve, reject) => {
            dbConnection.get(
                "SELECT * FROM passenger_ancillary_services WHERE email = ? AND password = ?",
                [passenger_ancillary_servicesname, password],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
        return passenger_ancillary_services;
    } catch (err) {
        throw err;
    }
  };