const { defaultWatchOptions } = require('./constants')

function getPipeline(...eventTypes) {
  const operations = eventTypes.map((eventType) => ({ operationType: eventType }));
  
  return [
    {
      '$match': {
        $or: operations
      }
    }
  ]
}

exports.watch = (schema, events, callbacks) => {
  return schema.watch(getPipeline(...events), defaultWatchOptions)
    .on('change', (e) => callbacks.forEach((cb) => cb(e, {})));
}