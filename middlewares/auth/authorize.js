
const authorize = (aArray) => {
    return (req, res, next) => {
        const {user} = req;
        
        if(aArray.findIndex((ele)=> ele === user.type) > -1){
            next();
        }else{
            res.status(403).send("Ban da dang nhap nhung ko co quyen");
        }
    }
}
module.exports = {
    authorize
}