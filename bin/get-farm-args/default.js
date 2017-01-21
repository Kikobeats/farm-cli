'use strict'

module.exports = {

  /**
  * Allows you to control the lifespan of your child processes.
  *
  * A positive number will indicate that you only want each
  * child to accept that many calls before it is terminated.
  *
  * This may be useful if you need to control memory leaks
  * or similar in child * processes.
  */
  maxCallsPerWorker: Infinity,

  /*
  * Will set the number of child processes to maintain concurrently.
  *
  * By default it is set to the number of CPUs available on
  * the current system, but it can be any reasonable number,
  * including 1.
  */
  maxConcurrentWorkers: require('os').cpus().length,

  /*
  * Allows you to control the concurrency of individual child processes.
  *
  * Calls are placed into a queue and farmed out to child processes
  * according to the number of calls they are allowed to handle concurrently.
  *
  * By default it is set to 1. If your calls aren't I/O bound
  * then it won't matter what value you use here as the individual
  * workers won't be able to execute more than a single call at a time.
  */
  maxConcurrentCallsPerWorker: 1,

  /*
  * Allows you to control the maximum number of calls in the queue—either
  * actively being processed or waiting for a worker to be processed.
  *
  * By default it is set to Infinity, that indicates no limit.
  *
  * If you have conditions that may endlessly queue jobs and you need to
  * set a limit then provide a >0 value and any calls that push the
  * limit will return on their callback with a MaxConcurrentCallsError
  * error (check err.type == 'MaxConcurrentCallsError').
  */
  maxConcurrentCalls: Infinity,

  /*
  * Use with caution, understand what this does before you use it!
  *
  * When !== Infinity, will cap a time, in milliseconds, that any single
  * call can take to execute in a worker.
  *
  * If this time limit is exceeded by just a single call then
  * the worker running that call will be killed and any calls running
  * on that worker will have their callbacks returned with a
  * TimeoutError (check err.type == 'TimeoutError').
  *
  * If you are running with maxConcurrentCallsPerWorker value greater
  * than 1 then all calls currently executing will fail and will be
  * automatically resubmitted uless you've changed the maxRetries option.
  *
  * Use this if you have jobs that may potentially end in infinite
  * loops that you can't programatically end with your child code.
  *
  * Preferably run this with a maxConcurrentCallsPerWorker so you don't
  * interrupt other calls when you have a timeout.
  *
  * This timeout operates on a per-call basis but will
  * interrupt a whole worker.
  */
  maxCallTime: Infinity,

  /*
  * Allows you to control the max number of call requeues
  * after worker termination (unexpected or timeout).
  *
  * By default this option is set to Infinity which means that
  * each call of each terminated worker will always be auto requeued.
  *
  * When the number of retries exceeds maxRetries value, the job
  * callback will be executed with a ProcessTerminatedError.
  *
  * Note that if you are running with finite maxCallTime and
  * maxConcurrentCallsPerWorkers greater than 1 then any
  * TimeoutError will increase the retries counter for each
  * concurrent call of the terminated worker.
  */
  maxRetries: Infinity,

  /*
  * When set to true will start the workers as early as possible.
  *
  * Use this when your workers have to do expensive initialization.
  * That way they'll be ready when the first request comes through.
  */
  autoStart: true,

  /**
   * Determine the delay before spawn a new worker
   */
  delayBetweenWorkers: 1000
}
