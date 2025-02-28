const jwt = require('jsonwebtoken');

const JWT_SECRET = "dddd";

const fetchuser = (req, res, next) => { 
    //Get the user from the jwt token and add id to req object
    // console.log("ljnj j ob  j  ");
    const token = req.header('auth-token');
    if (!token) { 
        res.status(401).send({ error: "Please authenticate using a valid token" });
       
    }
    try {
        const string = jwt.verify(token, JWT_SECRET);
        req.user = string.user;    //req me ek or user jaisa feild dal diya, taki local storage ko pkda paye.
        console.log(req.user);
        next();
    }
    catch (err) { 
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;