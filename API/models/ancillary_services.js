// Define the addAncillaryServices function
module.exports.addAncillaryServices = async function (ancillary_services) {

  const lengthObj = Object.keys(ancillary_services).length;
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.run(
        `INSERT INTO ancillary_services (${Object.keys(ancillary_services).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
        Object.values(ancillary_services),
        (err, data) => {
          console.log("data--", err, data);
          if (err) {
            console.error("Error inserting ancillary_services:", err);
            reject(err);
          } else {
            console.info("AncillaryServices inserted");
            resolve(true);
          }
        }
      );
    });
  } catch (err) {
    throw err;
  }
};

// Define the getAncillaryServices function
module.exports.getAncillaryServices = async function (params) {
  try {
    let conVAl = [];
    let sql = `SELECT * FROM ancillary_services ;`;
    console.log('query:', sql);

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

// Define the updateAncillaryServices function
module.exports.updateAncillaryServices = async function (ancillary_servicesId, params) {
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

    // Add ancillary_servicesId to the conVals array
    conVals.push(ancillary_servicesId);

    // Execute the UPDATE query
    await new Promise((resolve, reject) => {
      dbConnection.run(
        `UPDATE ancillary_services SET ${setClause} WHERE id = ?`,
        conVals,
        (err) => {
          if (err) {
            console.error("Error updating flights:", err);
            reject(err);
          } else {
            console.info("AncillaryServices updated");
            resolve(true);
          }
        }
      );
    });

  } catch (err) {
    throw err;
  }
};


module.exports.deleteAncillaryServices = async function (ancillary_servicesId) {
  try { 
    // Execute the UPDATE query
    await new Promise((resolve, reject) => {
      dbConnection.run(
        `DELETE from  ancillary_services  WHERE id = ?`,
        [ancillary_servicesId],
        (err) => {
          if (err) {
            console.error("Error delete ancillary-services:", err);
            reject(err);
          } else {
            console.info("ancillary-services delete");
            resolve(true);
          }
        }
      );
    });

  } catch (err) {
    throw err;
  }
};
 