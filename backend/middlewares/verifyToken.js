const jwt = require("jsonwebtoken");

// verify token = التحقق من صحة الـ JWT (التوقيع، الصلاحية، وعدم التلاعب) قبل السماح بالوصول
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

// verify token and authorization
function verifyTokenAndAuthorization(req, res, next){
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            return res.status(403).json({message: "Not allowed, only user himself or admin"});
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUser,
    verifyTokenAndAuthorization
}