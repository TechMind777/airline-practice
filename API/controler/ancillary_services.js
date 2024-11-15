const ancillaryServicesModels = require('../models/ancillary_services');


const getAncillaryServices = async () => {
    let ancillaryServicesData = await ancillaryServicesModels.getAncillaryServices(); 
        return ancillaryServicesData;
}
const addAncillaryServices = async (body) => {
    console.log("body",body)
    let ancillaryServicesData = await ancillaryServicesModels.addAncillaryServices( {
        service_name:body.service_name,
        description:body.description,
        price:body.price,
    }); 
        return ancillaryServicesData;
}
const updateAncillaryServices = async (body) => {
    let ancillaryServicesData = await ancillaryServicesModels.updateAncillaryServices(body.id, {service_name:body.service_name,
        description:body.description,
        price:body.price,}); 
        return ancillaryServicesData;
}

module.exports = { getAncillaryServices, addAncillaryServices, updateAncillaryServices }