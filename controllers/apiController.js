import mongoose from 'mongoose';
import multer from 'multer';
import uuid from 'uuid';
const Job = mongoose.model('Job');

exports.createJob = async (req, res) => {
	if(req.userData.account !== 'employer'){
		res.json({ status: false, message: 'You must be an employer to post a job!'})
	}
	req.body.poster = req.userData.id;
	const job = await (new Job(req.body)).save();
	res.json({ status: true, message: `Successfully created - ${job.title} job post!` });
}

exports.getJobs = async (req, res) => {
	const jobs = await Job.find({status: true});
	res.json(jobs);
}