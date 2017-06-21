Package.describe({
  name: 'zzbase:how-long-ago',   // by ZZ, Inc.
  summary: "Simple template to take a date and detect how long ago.",
  version: "0.0.1",
  git: ""
});

Package.onUse(function (api) {
  api.use("templating");
  api.use("session");

  // Common
  //api.add_files('common/collections.js', ['client', 'server']);

  // Client
  api.add_files('client/how-long-ago.html', [ 'client' ]);
  api.add_files('client/how-long-ago.js', [ 'client' ]);

  // Server
  api.add_files('server/how-long-ago-functions.js', ['server']);
  //api.add_files('server/publish.js', ['server']);
  //api.add_files('server/methods.js', ['server']);
  //api.add_files('server/log-points.js', ['server']);

  // Exports
  //api.export('log', ['client', 'server']);
  //api.export('logTest', ['client', 'server']);
  //api.export('logEnable', ['client', 'server']);
  //api.export('logDisable', ['client', 'server']);
  //api.export('LogPoints', ['client', 'server']);
});