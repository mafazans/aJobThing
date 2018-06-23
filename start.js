import mongoose from 'mongoose';
require('dotenv').config({path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', err => {
	console.error(`${err.message}`);
});

import './models/User';
import './models/Companyprofile';
import './models/Freelancerprofile';
import './models/Job';
import './models/Proposal';

const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running in PORT ${server.address().port}`);
});