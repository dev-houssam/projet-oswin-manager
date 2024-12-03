const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message : 'Token manquant'
        });
    }

    try {
        const decoded = jwt.verify(token, 'WINMANAGER-456');
        req.user = decoded;
        //console.log(req.user);
        next();
    } catch (error) {
        res.status(403).json({
            message : 'Token invalide'
        });
    }
}