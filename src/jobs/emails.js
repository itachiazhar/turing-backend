const mailer = require('../utils/mailer');
const logger = require('../utils/logger');
const client = require('./../kue-client');

client.jobQueue.process('SEND.email', 10, (job, context, done) => {
  sendEmail(job, context, done);
});

/***
 *
 * @param job will have data that is required to send email
 * @param jobContext
 * @param done
 * @description Background worker to send email. By keeping this separate we remove the dependency of email failure
 * from the workers related to user, invite, campaign, invoice etc.
 */
const sendEmail = (job, jobContext, done) => {
  logger.info('Send Email job started');
  const { recipient, subject, template, context } = job.data;
  mailer.sendMail({
    recipient,
    subject,
    template,
    context
  }, (err, info) => {
    logger.info('Send Email job ended');
    if (err) logger.info(err);
    done(err);
  });
};
