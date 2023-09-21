import { Server, IncomingMessage, ServerResponse } from "http";
import http from "http";
import os from "os";

const hostName: string = `127.0.0.1`
const port: number = 5000
const server: Server = http.createServer((request: IncomingMessage, response: ServerResponse)=> {
    response.statusCode = 200
    response.setHeader("content-type", "text/html")
    // OS Module

    let osData = {
        totalMemoy : os.totalmem(),
        freeMemory : os.freemem(),
        homeDir: os.homedir(),
        computerName : os.hostname()
    }

    response.end(`<pre>${JSON.stringify(osData)}</pre>`)
    //response.end("<h3> Welcome to node js server </h3>")
})

server.listen(port, hostName, () =>{
    console.log(`server running port ${port}`);  
})