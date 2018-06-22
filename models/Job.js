import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: 'Your job must have a title!'
	},
	description: {
		type: String,
		trim: true,
	},
	location: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	},
	poster: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'You must have a job poster!'
	},
	status: {
		type: Boolean,
		default: 0,
		description: 'bool 0 for draft and 1 for published'
	}
});

jobSchema.index({
	title: 'text',
	location: 'text',
});

module.export = mongoose.model('Job', jobSchema);