const consultantService = require("../services/consultantService");
const { catchAsync } = require("../utils/error");

const createConsultant = catchAsync(async (req, res) => {
        const { content, trainerId, threadTypesId = 3 } = await req.body;
                
        const userId = req.user.userId;
    
        const thread = await consultantService.createConsultThreads(userId, threadTypesId, content, trainerId);

        res.status(201).json({message : "success"})   
    });

module.exports = { createConsultant };