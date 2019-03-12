const redis = require('redis');
const kue = require('kue');
const kueScheduler = require('kue-scheduler');
const config = require('./configs/turing');
const logger = require('./utils/logger');

let jobQueue;
let scheduledJobQueue;
if (config.env === 'test') {
  const db = 1;
  const redisClient = redis.createClient({
    db: db
  });
  redisClient.flushdb((err) => {
    if (!err) logger.info(`db ${db} purged`);
  });
  jobQueue = kue.createQueue({ redis: { db: db } });
  scheduledJobQueue = kueScheduler.createQueue({ redis: { db: db } });
}
else {
  jobQueue = kue.createQueue();
  scheduledJobQueue = kueScheduler.createQueue();
}

jobQueue.on('error', ( err ) => {
  logger.error( 'Oops... ', err );
});

scheduledJobQueue.restore((error, schedules) => {

});

// we will see for stuck job and give it 15 minutes 1000 * 60 * 15 = 15 minutes
jobQueue.watchStuckJobs(1000 * 60 * 15);

process.once('SIGTERM', sig => {
  jobQueue.shutdown(5000, (err) => {
    process.exit(0);
  });
});

module.exports = {
  jobQueue,
  scheduledJobQueue
};
