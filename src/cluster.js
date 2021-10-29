import cluster from "cluster";
import os from "os";
import express from "express";
import dotenv from "dotenv";

import server from "./index";

dotenv.config();

let cpus = os.cpus();

if (process.env.ENV === 'prod') {
    if (cluster.isMaster) {
        console.log('master cluster is running');
        for (let i = 0; i < cpus.length; i++) {
            cluster.fork();
        }

        cluster.on('exit', () => {
            cluster.fork();
        })
    } else {
        let app = express();
        server(app);
    }
} else {
    server(express());
}