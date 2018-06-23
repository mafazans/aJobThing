import mongoose from 'mongoose';
import multer from 'multer';
const Job = mongoose.model('Job');
const Companyprofile = mongoose.model('Companyprofile');
const Freelancerprofile = mongoose.model('Freelancerprofile');
const Appliedjob = mongoose.model('Appliedjob');

exports.upload = multer({ dest: './public/uploads/' }).single('cv');

exports.createCompanyProfile = async (req, res) => {
	if(req.userData.account !== 'employer'){
		res.json({ status: false, message: 'You must be an employer!'})
	}
	req.body.employer = req.userData.id;
	req.body.email = req.userData.email;
	req.body.name = req.userData.name;

	const checkCompany = await Companyprofile.find({ employer: req.userData.id })
	if(checkCompany.length === 0){
		const company = await (new Companyprofile(req.body)).save();
		res.json({ status: true, company });
	}
	const company = await Companyprofile.findOneAndUpdate({ employer: req.userData.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	res.json({ status: true, message: 'Profile updated', company });
}

exports.createFreelancerProfile = async (req, res) => {
	if(req.userData.account !== 'freelancer'){
		res.json({ status: false, message: 'You must be a freelancer!'})
	}

	const extension = req.file.mimetype.split('/')[1];
	req.body.cv = req.file.filename;

	req.body.freelancer = req.userData.id;
	req.body.email = req.userData.email;

	const checkFreelancer = await Freelancerprofile.find({ freelancer: req.userData.id });
	if(checkFreelancer.length === 0){
		const freelancer = await (new Freelancerprofile(req.body)).save();
		res.json({ status: true, freelancer });
	}
	const freelancer = await Freelancerprofile.findOneAndUpdate({ freelancer: req.userData.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	res.json({ status: true, message: 'Profile updated', freelancer });
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

exports.applyJob = async (req, res) => {
	if(req.userData.account !== 'freelancer'){
		res.json({ status: false, message: 'You must be a freelancer!'})
	}

	const freelancer = await Freelancerprofile.findOne({ freelancer: req.userData.id });

	if((freelancer.rank === 'B' && freelancer.points <20) || (freelancer.rank === 'A' && freelancer.points <40)){
		const checkApplied = await Appliedjob.find({ job: req.body.jobId, applicant: freelancer });
		if(checkApplied.length === 0){
			const job = await Job.findOne({ _id: req.body.jobId } );
			const employer = await Companyprofile.find();

			const appliedJob = await (new Appliedjob({
				job: job._id,
				applicant: freelancer._id,
				company: job.poster
			})).save();

			await Freelancerprofile.findOneAndUpdate({ freelancer: req.userData.id }, { points: freelancer.points+2}, {
					new: true,
					runValidators: true
				}).exec();

			res.json({ status: true, message: 'Applied', appliedJob });
		}
		res.json({ status: false, message: 'Cant apply the same job'})
	}
	res.json({status: false, message: 'You exceed your limit points'})
}

exports.getApplicants = async (req, res) => {
	const applicants = await Appliedjob.find({ company: req.userData.id}).populate('applicant');
	res.json(applicants)
}