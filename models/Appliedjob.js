import mongoose from 'mongoose';

const appliedjobSchema = new mongoose.Schema({
	job : {
		type: mongoose.Schema.ObjectId,
		ref: 'Job',
		required: true
	},
	applicant : {
		type: mongoose.Schema.ObjectId,
		ref: 'Freelancerprofile',
		required: true
	},
	company : {
		type: mongoose.Schema.ObjectId,
		ref: 'Companyprofile',
		required: true
	}
});

module.export = mongoose.model('Appliedjob', appliedjobSchema);