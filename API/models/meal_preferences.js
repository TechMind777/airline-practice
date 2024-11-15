// Define the addMealPreferences function
module.exports.addMealPreferences = async function (meal_preferences) {
 
    const lengthObj = Object.keys(meal_preferences).length;
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.run(
          `INSERT INTO meal_preferences (${Object.keys(meal_preferences).toString()}) 
                 VALUES 
                    (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
          Object.values(meal_preferences),
          (err, data) => {
            console.log("data--" , err, data);
            if (err) {
              console.error("Error inserting meal_preferences:", err);
              reject(err);
            } else {
              console.info("MealPreferences inserted");
              resolve(true);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  };
  
  // Define the getMealPreferences function
  module.exports.getMealPreferences = async function (params) {
    try {
      let conVAl = [];
      let sql = `SELECT * FROM meal_preferences  `; 
   
  
      return await new Promise((resolve, reject) => {
        dbConnection.all(sql, conVAl, (err, row) => {
          if (err) {
            console.error("Error fetching meal_preferences:", err);
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
  
  // Define the updateMealPreferences function
  module.exports.updateMealPreferences = async function (meal_preferencesId, params) {
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
  
      // Add meal_preferencesId to the conVals array
      conVals.push(meal_preferencesId);
  
      // Execute the UPDATE query
      await new Promise((resolve, reject) => {
        dbConnection.run(
          `UPDATE meal_preferences SET ${setClause} WHERE id = ?`,
          conVals,
          (err) => {
            if (err) {
              console.error("Error updating meal_preferences:", err);
              reject(err);
            } else {
              console.info("MealPreferences updated");
              resolve(true);
            }
          }
        );
      });
  
    } catch (err) {
      throw err;
    }
  };
  module.exports.deleteMealPreferences = async function (meal_preferencesId) {
    try { 
      // Execute the UPDATE query
      await new Promise((resolve, reject) => {
        dbConnection.run(
          `DELETE from  meal-preferences  WHERE id = ?`,
          [meal_preferencesId],
          (err) => {
            if (err) {
              console.error("Error delete meal_preferences:", err);
              reject(err);
            } else {
              console.info("MealPreferences delete");
              resolve(true);
            }
          }
        );
      });
  
    } catch (err) {
      throw err;
    }
  };
   