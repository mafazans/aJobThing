import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import userController from '../controllers/userController';
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/signup', catchErrors(userController.signup));
router.post('/login', catchErrors(userController.login));

module.exports = router;