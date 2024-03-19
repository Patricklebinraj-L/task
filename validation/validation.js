
const nameValid = (name)=>{

    if(!name){
        return true
    }

    if(name.length===0){
        return true
    }
    else{
        return false
    }

}

const emailValid = (email)=>{


    const l = ["@",".com","gmail","yahoo"]
    let c=0
    for(let x of l){
        if(email.includes(x)){
            c+=1
        }
    }
    if((c==3) && (email.length>10)){
        return false
    }
    else{
        return true
    }



}

const passwordValid = (password)=>{

    if(!password){
        return true
    }

    if((password.length>=3) && (password.length<=10) ){
        return false
    }
    else{
        return true
    }

}


module.exports = {

    nameValid:nameValid,
    emailValid:emailValid,
    passwordValid:passwordValid
}