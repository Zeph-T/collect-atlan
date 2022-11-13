exports.defaultPipeline = [
    {
      '$match': {
        $or: [
          { operationType: 'insert' },
          { operationType: 'update' },
          { operationType: 'delete' },
          { operationType: 'replace' }
        ]
      }
    }
  ];
  
  exports.defaultWatchOptions = {
    fullDocument: 'updateLookup',
  };