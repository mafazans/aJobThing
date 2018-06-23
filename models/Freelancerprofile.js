import mongoose from 'mongoose';

const freelancerprofileSchema = new mongoose.Schema({
	freelancer: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	nickname: String,
	location: String,
	description: String,
	phone: String,
	skills: [String],
	cv: {
		type: String,
		required: 'Please upload your CV!'
	}
});

module.export = mongoose.model('Freelanceprofile', freelancerprofileSchema);