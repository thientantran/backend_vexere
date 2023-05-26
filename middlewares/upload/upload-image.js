const multer = require("multer");
const mkdirp = require("mkdirp");
const uploadImage = (type) =>{
    const made = mkdirp.sync(`./public/images/${type}`);
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, `./public/images/${type}`); // setup where to store the data
        },
        filename: function(req, file, cb){
            cb(null, Date.now() + "_" + file.originalname) // set name of file when it will be stored
            //we should add date into the name because it can be replaced if there is a file that has the same name
        }
    })
    const upload = multer({
        storage:storage,
        fileFilter: function(req, file, cb){
            const extensionImageList = [".jpg",".png",". jpeg"];
            const extension = file.originalname.slice(-4);
            const check = extensionImageList.includes(extension);
            if(check){
                cb(null,true);
            }else{
                cb(new Error("Please upload jpg, png, jpeg files"))
            }
        }    
    });
    return upload.single(type)
}

module.exports = {
    uploadImage
}