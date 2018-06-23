import mongoose from 'mongoose';
import multer from 'multer';
import uuid from 'uuid';
const Job = mongoose.model('Job');
const Companyprofile = mongoose.model('Companyprofile');

exports.createCompanyProfile = async (req, res) => {
	if(req.userData.account !== 'employer'){
		res.json({ status: false, message: 'You must be an employer!'})
	}
	const checkCompany = await Companyprofile.find({ employer: req.userData.id })
	if(checkCompany.length === 0){
		req.body.employer = req.userData.id;
		const company = await (new Companyprofile(req.body)).save();
		res.json({ status: true, company });
	}
	res.json({ status: true, message: 'Make an edit profile' });
}

exports.createJob = async (req, res) => {
	if(req.userData.account !== 'employer'){
		res.json({ status: false, message: 'You must be an employer to post a job!'})
	}
	const checkCompany = await Companyprofile.find();
	console.log(checkCompany[0].id);
	if(checkCompany.length === 0){
		res.json({ status: false, message: 'Return to company profile page' })
	}
	req.body.poster = checkCompany[0].id;
	const job = await (new Job(req.body)).save();
	res.json({ status: true, message: `Successfully created - ${job.title} job post!` });
}

exports.getJobs = async (req, res) => {
	const jobs = await Job.find({status: true}).populate('poster');
	res.json(jobs);
}