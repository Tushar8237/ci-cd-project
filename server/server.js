import app from './app.js';
import cluster from 'cluster';
import os from 'os';

const port = process.env.PORT || 5000;

const numCPUs = os.cpus().length;

console.log(numCPUs)

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork worker
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // Optional log if a worker dies
  cluster.on('exit', (worker, code, single) => {
    console.log(`Worker ${worker.process.pid} died. Restarting`);
    cluster.fork();
    console.log(code);
    console.log(single)
  });
} else {
  // Each worker runs this code
  app.listen(port, () => {
    console.log(`Worker ${process.pid} running on port ${port}`)
  })
}

// if (cluster.isWorker) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork worker
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork()
//   }

//   // Optional log if a worker dies
//   cluster.on('exit', (worker, code, single) => {
//     console.log(`Worker ${worker.process.pid} died. Restarting`);
//     cluster.fork();
//   });
// } else {
//   // Each worker runs this code
//   app.listen(3000, () => {
//     console.log(`Worker ${process.pid} running on port 3000`)
//   })
// }

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
