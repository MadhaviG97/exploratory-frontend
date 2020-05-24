const joi = require('@hapi/joi');

module.exports.groupName_validation = (data)=>{
    const schema = joi.object({
        "Group Name": joi.string().required().max(255)
    });
    return schema.validate({"Group Name":data});
}

module.exports.groupDescription_validation = (data)=>{
    const schema = joi.object({
        Description: joi.string().required()
    });
    return schema.validate({Description:data});
}