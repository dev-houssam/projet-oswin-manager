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

//Version future : Utilisation des cookies : 
/*
Serveur: 
res.cookie('access_token', token, {
  httpOnly: true,
  secure: true, // Utilisez HTTPS en production
  sameSite: 'strict',
  expires: new Date(Date.now() + 3600000) // Expire dans 1 heure
});

Client : 
fetch('/api/endpoint', {
  method: 'GET',
  credentials: 'include' // Inclut les cookies dans la requête
});


*/