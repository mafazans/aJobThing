import mongoose from 'mongoose';

const companyprofileSchema = new mongoose.Schema({
	employer: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	companyName: String,
	location: String,
	description: String,
	phone: String
});

module.export = mongoose.model('Companyprofile', companyprofileSchema);