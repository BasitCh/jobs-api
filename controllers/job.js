const { StatusCodes } = require('http-status-codes')
const Job = require('../models/job')
const { NotFoundError } = require('../errors')
const BadRequest = require('../errors/bad-request')

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create({...req.body})
    res.status(StatusCodes.OK).json({ job, ...req.user })
}

const getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const jobId = req.params.id
    const job = await Job.findOne({ createdBy: req.user.userId, 
        _id: jobId
     })
     if (!job) {
        throw new NotFoundError(`No job found with id ${jobId}`)
     }
     res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
    const {
        body: {company, position},
        user: {userId},
        params: {id: jobId }
    } = req

    if (!company || !position) {
        throw new BadRequest('Company or position fields can not be empty')
    }
    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true})
    if (!job) {
        throw new NotFoundError(`No job found with id ${jobId}`)
     }
     res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const jobId = req.params.id
    const job = await Job.findOneAndDelete({ createdBy: req.user.userId, 
        _id: jobId
     })
     if (!job) {
        throw new NotFoundError(`No job found with id ${jobId}`)
     }
     res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
}