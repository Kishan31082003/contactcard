

const isadmin = (req, res, next) => { 
    console.log(req.user);
    if(req.user.role!=='admin'){
        return  res.status(401).send({error:`${req.user.role}`});
    }
    next();

    
}

module.exports = isadmin;