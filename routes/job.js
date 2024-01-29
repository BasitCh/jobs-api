const express = require('express')
const router = express.Router()

const {createJob, updateJob, getJobs, getJob, deleteJob} = require('../controllers/job')

router.route('/').post(createJob).get(getJobs)
router.route('/:id').patch(updateJob).get(getJob).delete(deleteJob)

module.exports = router