import express from 'express';
const router = express.Router();
import apiController from '../controllers/apiController';
const { catchErrors } = require('../handlers/errorHandlers');
const checkAuth = require('../handlers/check-auth');

router.post('/createjob',
	catchErrors(checkAuth),
	catchErrors(apiController.createJob)
	);

router.get('/jobs', catchErrors(apiController.getJobs));

module.exports = router;