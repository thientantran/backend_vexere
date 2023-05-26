const checkExist = (model) =>{
    return async (req, res, next) => {
        const {id} = req.params;
        const newData = await model.findOne({
            where:{
                id,
            }
        });
        if(newData){
            next();
        }else{
            res.status(404).send("ko tim thay du lieu")
        }
    }
}


module.exports = {
    checkExist
}