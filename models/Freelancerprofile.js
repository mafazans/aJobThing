import mongoose from 'mongoose';

const freelancerprofileSchema = new mongoose.Schema({
	freelancer: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	rank: {
		type: String,
		default: "B"
	},
	points: {
		type: Number,
		default: 0
	},
	email: String,
	nickname: String,
	location: String,
	description: String,
	phone: String,
	skills: [String],
	cv: {
		type: String
	}
});

module.export = mongoose.model('Freelancerprofile', freelancerprofileSchema);