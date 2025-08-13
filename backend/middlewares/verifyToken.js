const jwt = require("jsonwebtoken");

// verify Token
function verifyToken(req, res, next){
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // verify => تحقق من صحة التوكين + تأكد إنه ما انتهى + رجّع البيانات اللي جواه
            req.user = decodedPayload;
            next();

        } catch (error) {
        return res.status(401).json({message: "Invalid token, access denied"});
        }

    } else{
        return res.status(401).json({message: "No token provided, access denied"});
    }
}

// verify token and admin
function verifyTokenAndAdmin(req, res, next){
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next(); // يعني روح ل مدلوير للي بعدك اللي هو getAllUsersCtrl
        } else{
            return res.status(403).json({message: "Not allowed, only admin"});
        }
    })
};

// verify token and only user himself
function verifyTokenAndUser(req, res, next){
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id){
            next();
        } else{
            return res.status(403).json({message: "Not allowed, only user himself"});
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUser
}