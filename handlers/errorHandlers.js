exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  res.status(404).send({status: false, message: 'Page not Found!'})
};

exports.mongoError = (err, req, res, next) => {
	if(!err.errors) return next(err);
	const errorKeys = Object.keys(err.errors);
	errorKeys.forEach(key => res.status(422).send({ status: false ,message: err.errors[key].message}));
};

exports.authError = (err, req, res, next) => {
	if(!err) return next(err);
	const errorKeys = Object.keys(err);
	errorKeys.forEach(key => res.status(401).send({ status: false ,message: 'Not Authenticated!'}));
};