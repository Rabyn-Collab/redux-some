const jwt = require('jsonwebtoken');



module.exports.checkauth = async (req, res, next) => {

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ status: 'you are not authorised' });
    }
    const actualToken = token.split(' ')[1];
    const decoded = jwt.decode(actualToken, 'tokenGenerate');

    if (!decoded) {
      return res.status(401).json({ status: 'you are not authorised' });
    }
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(401).json('not authorised');
  }


}