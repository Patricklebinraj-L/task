const bcrypt = require("bcrypt")


const encrypt = async function(password,res){

    bcrypt.hash(password, 10, function(err, hash) {

        if(err){
            res(null)
        }
        else{
            res(hash)
        }

    })

}


const decrypt = function(password,encrypt,res){

    bcrypt.compare(password,encrypt,function(err,data){
        if(err){
            res(null)
        }
        else{
            res(data)
        }
    })

}

module.exports = {
    encrypt:encrypt,
    decrypt:decrypt
}