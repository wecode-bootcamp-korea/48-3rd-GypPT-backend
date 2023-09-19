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

    const deleteConsultant = async (threadId) => {
        const queryRunner = await dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query (
                `
                DELETE FROM comments
                WHERE thread_id = ?
                `,
                [threadId]
            )
            await queryRunner.query(
            `
            DELETE FROM threads
            WHERE id = ?
            `,
            [threadId]); 

           await queryRunner.commitTransaction(); 
        } catch{
            await queryRunner.rollbackTransaction();
            const error = new Error("error");
            error.statusCode = 400;
            throw error;
        } finally {
            await queryRunner.release();
        }
    };

    module.exports = { createConsultant, deleteConsultant };