const mealPreferencesModels = require('../models/meal_preferences');


const getMealPreferences = async () => {
    let mealPreferencesData = await mealPreferencesModels.getMealPreferences();
    return mealPreferencesData;
}
const addMealPreferences = async (body) => {
    let mealPreferencesData = await mealPreferencesModels.addMealPreferences(body.id, {
        meal_type: body.meal_type,
        description: body.description,
        price: body.price,
    });
    return mealPreferencesData;
}
const updateMealPreferences = async (body) => {
    let mealPreferencesData = await mealPreferencesModels.updateMealPreferences(body.id, {
        meal_type: body.meal_type,
        description: body.description,
        price: body.price,
    });
    return mealPreferencesData;
}

const deleteMealPreferences = async (body) => {
    let mealPreferencesData = await mealPreferencesModels.deleteMealPreferences(body.id );
    return mealPreferencesData;
}

module.exports = { getMealPreferences, addMealPreferences, updateMealPreferences }