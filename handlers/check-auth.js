import jwt from 'jsonwebtoken';

module.exports = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	const decoded = await jwt.verify(token, process.env.JWT_KEY);
	req.userData = decoded;
	next();
}