import express from 'express';
const router = express.Router();
import apiController from '../controllers/apiController';
const { catchErrors } = require('../handlers/errorHandlers');
const checkAuth = require('../handlers/check-auth');

router.post('/companyprofile',
	catchErrors(checkAuth),
	catchErrors(apiController.createCompanyProfile)
	);

router.post('/freelancerprofile',
	catchErrors(checkAuth),
	apiController.upload,
	catchErrors(apiController.createFreelancerProfile)
	);

router.post('/createjob',
	catchErrors(checkAuth),
	catchErrors(apiController.createJob)
	);

router.get('/jobs', catchErrors(apiController.getJobs));

router.post('/applyjob',
	catchErrors(checkAuth),
	catchErrors(apiController.applyJob)
	);

module.exports = router;