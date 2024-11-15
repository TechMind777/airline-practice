// Define the addRoles function
module.exports.addRoles = async function (role) {
 
  const lengthObj = Object.keys(role).length;
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.run(
        `INSERT INTO roles (${Object.keys(role).toString()}) 
               VALUES 
                  (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
        Object.values(role),
        (err, data) => {
          console.log("data--" , err, data);
          if (err) {
            console.error("Error inserting role:", err);
            reject(err);
          } else {
            console.info("Roles inserted");
            resolve(true);
          }
        }
      );
    });
  } catch (err) {
    throw err;
  }
};

// Define the getRoles function
module.exports.getRoles = async function (params) {
  try {
    let conVAl = [];
    let sql = `SELECT * FROM roles WHERE `;
    if (params?.id) {
      sql += `id = ?`;
      conVAl.push(params.id);
    }
    sql += "1=1";

    console.log('query:', sql);

    return await new Promise((resolve, reject) => {
      dbConnection.all(sql, conVAl, (err, row) => {
        if (err) {
          console.error("Error fetching role:", err);
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

// Define the updateRoles function
module.exports.updateRoles = async function (roleId, params) {
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
        `UPDATE roles SET ${setClause} WHERE id = ?`,
        conVals,
        (err) => {
          if (err) {
            console.error("Error updating role:", err);
            reject(err);
          } else {
            console.info("Roles updated");
            resolve(true);
          }
        }
      );
    });

  } catch (err) {
    throw err;
  }
};

// Define the getRolesByRolesnameAndPassword function
module.exports.getRolesByRolesnameAndPassword = async function (rolename, password) {
  try {
      const role = await new Promise((resolve, reject) => {
          dbConnection.get(
              "SELECT * FROM roles WHERE email = ? AND password = ?",
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