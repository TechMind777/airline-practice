// Define the addTag function
module.exports.addTag = async function (tag) {

    console.log("tag---",tag)
    const lengthObj = Object.keys(tag).length;
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.run(
          `INSERT INTO tags (${Object.keys(tag).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
          Object.values(tag),
          (err, data) => {
            console.log("data--" , err, data);
            if (err) {
              console.error("Error inserting tag:", err);
              reject(err);
            } else {
              console.info("Tag inserted");
              resolve(true);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getTag function
  module.exports.getTag = async function (params) {
    try {
      let conVAl = [];
      let sql = `SELECT * FROM tags WHERE `;
      if (params?.id) {
        sql += `id = ?`;
        conVAl.push(params.id);
      }
      sql += "1=1";
  
      console.log('query:', sql);
  
      return await new Promise((resolve, reject) => {
        dbConnection.all(sql, conVAl, (err, row) => {
          if (err) {
            console.error("Error fetching tag:", err);
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
  
  // Define the updateTag function
  module.exports.updateTag = async function (tagId, params) {
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
  
      // Add tagId to the conVals array
      conVals.push(tagId);
  
      // Execute the UPDATE query
      await new Promise((resolve, reject) => {
        dbConnection.run(
          `UPDATE tags SET ${setClause} WHERE id = ?`,
          conVals,
          (err) => {
            if (err) {
              console.error("Error updating tag:", err);
              reject(err);
            } else {
              console.info("Tag updated");
              resolve(true);
            }
          }
        );
      });
  
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getTagByTagnameAndPassword function
  module.exports.getTagByTagnameAndPassword = async function (tagname, password) {
    try {
        const tag = await new Promise((resolve, reject) => {
            dbConnection.get(
                "SELECT * FROM tags WHERE email = ? AND password = ?",
                [tagname, password],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
        return tag;
    } catch (err) {
        throw err;
    }
  };