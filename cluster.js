const cluster = require('cluster');
const express = require('express');
const numCpuCores = require("os").cpus().length;

const app = express();

if (cluster.isMaster) {
    // master process
    
  // spawn child processes, one for each cpu core
  for (let i = 0; i < numCpuCores; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`closing down pid: ${worker.process.pid}`);
    // you could run cluster.fork() to spawn another one...
  });
} else {
  // worker process
    
  // create server on port 3000 (same for all processes)
  app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000, process id ${process.pid}`);
  });

  app.get('/', (_req, res) => {
    res.send(`Example response from ${process.pid}`);
  });
}

app.get('/hello', (_req, res) => {
    res.send('Hello World');
})

app.get('/bye', (_req, res) => {

    for (let i = 0; i < 10000000000; i++) {
        // console.log(i);
    }

    res.send('Goodbye World');
});
