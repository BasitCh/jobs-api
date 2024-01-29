const { StatusCodes } = require('http-status-codes')

const createJob = (req, res) => {
    res.status(StatusCodes.OK).send('Job is created')
}

const getJobs = (req, res) => {
    res.status(StatusCodes.OK).send('All jobs fetched')
}

const getJob = (req, res) => {
    res.status(StatusCodes.OK).send('Single job is fetched')
}

const updateJob = (req, res) => {
    res.status(StatusCodes.OK).send('Job is updated')
}

const deleteJob = (req, res) => {
    res.status(StatusCodes.OK).send('Job is deleted')
}

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
}