
module.exports = {
    active: true,
    instrument: true,
    asyncHooks: true,
    captureBody: 'all',
    errorOnAbortedRequests: false,
    abortedErrorThreshold: 25000,
    transactionSampleRate: 1.0,
    frameworkName: 'elastic-apm-node',
    frameworkVersion: '7.4.2',
    logLevel: 'info',
    captureExceptions: true,
    captureErrorLogStackTraces: 'messages',
    captureSpanStackTraces: true,
    errorMessageMaxLength: 2048,
    stackTraceLimit: 50,
    transactionMaxSpans: 500,
    flushInterval: 10,
    serverTimeout: 30,
    maxQueueSize: 100,
    filterHttpHeaders: true,
    globalLabels: {
      platform: 'EA_Tech_Services',
      application: 'ConfigWorkflow',
      sub_platform: 'ConfigWorkflow',
      sub_application: 'CW_NJ_WFInbox',
      component_name: 'CW_NJ_WFInbox',
      component_type: 'API'
    }
  }
  