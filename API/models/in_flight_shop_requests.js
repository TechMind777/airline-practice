// Define the addInFlightShopRequests function
module.exports.addInFlightShopRequests = async function (in_flight_shop_requests) {
 
    const lengthObj = Object.keys(in_flight_shop_requests).length;
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.run(
          `INSERT INTO in_flight_shop_requests (${Object.keys(in_flight_shop_requests).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
          Object.values(in_flight_shop_requests),
          (err, data) => {
            console.log("data--" , err, data);
            if (err) {
              console.error("Error inserting in_flight_shop_requests:", err);
              reject(err);
            } else {
              console.info("InFlightShopRequests inserted");
              resolve(true);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getInFlightShopRequests function
  module.exports.getInFlightShopRequests = async function (params) {
    try {
      let conVAl = [];
      let sql = `SELECT * FROM in_flight_shop_requests WHERE `;
      if (params?.id) {
        sql += `id = ?`;
        conVAl.push(params.id);
      }
      sql += "1=1";
  
      console.log('query:', sql);
  
      return await new Promise((resolve, reject) => {
        dbConnection.all(sql, conVAl, (err, row) => {
          if (err) {
            console.error("Error fetching in_flight_shop_requests:", err);
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
  
  // Define the updateInFlightShopRequests function
  module.exports.updateInFlightShopRequests = async function (in_flight_shop_requestsId, params) {
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
  
      // Add in_flight_shop_requestsId to the conVals array
      conVals.push(in_flight_shop_requestsId);
  
      // Execute the UPDATE query
      await new Promise((resolve, reject) => {
        dbConnection.run(
          `UPDATE in_flight_shop_requests SET ${setClause} WHERE id = ?`,
          conVals,
          (err) => {
            if (err) {
              console.error("Error updating in_flight_shop_requests:", err);
              reject(err);
            } else {
              console.info("InFlightShopRequests updated");
              resolve(true);
            }
          }
        );
      });
  
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getInFlightShopRequestsByInFlightShopRequestsnameAndPassword function
  module.exports.getInFlightShopRequestsByInFlightShopRequestsnameAndPassword = async function (in_flight_shop_requestsname, password) {
    try {
        const in_flight_shop_requests = await new Promise((resolve, reject) => {
            dbConnection.get(
                "SELECT * FROM in_flight_shop_requests",
                [in_flight_shop_requestsname, password],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
        return in_flight_shop_requests;
    } catch (err) {
        throw err;
    }
  };