const {dataSource} = require("./dataSource");

const createConsultant = async (userId, threadTypesId, content, trainerProfileId) => {
    try{    
     await dataSource.query(
    `
    INSERT INTO threads (
        user_id,
        thread_types_id,
        content,
        trainer_profile_id
    ) VALUES (
        ?,
        ?,
        ?,
        ?
    )
     `,
     [userId, threadTypesId, content, trainerProfileId]   
    ) 
    }catch{
      const error = new Error("error");
      error.statusCode = 400;
      throw error;  
    }};

    module.exports = { createConsultant };