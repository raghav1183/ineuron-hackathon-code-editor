var fs = require("fs");
const { exec } = require("child_process");



const http = require("http");
const { randomInt } = require("crypto");
const httpserver = http.createServer((req, res) => {
    console.log("We got a request");
});
let connection = null;

let con_arr = [];

let port = 3003;

const WebSocketServer = require("websocket").server;

const websocket = new WebSocketServer({

    httpServer: httpserver
});

websocket.on("request", (request) => {
    connection = request.accept(null, request.origin);//null=any protocol, request.origin=origin of the request(any origin)
    //how do we get the file name at this point? can we
    con_arr.push(connection);//add databaseologics

    con_arr.forEach(con => {

        con.on("open",()=>{
            console.log("Connection open");
            
    })

    con.on("close", (message) => {
            console.log("Connection closed");
            con_arr.splice(con_arr.indexOf(con),1)
    })
            

    
    
        con.on("message", (message) => {
            console.log("Got a message");
            console.log(message);

            //get file name
            //get file type
            //create file with unique name
            //compile
            //run and call back.

            let packet = JSON.parse(message["utf8Data"])

            // packet.file_name="abcd"

            file_name=packet["file_name"]+"."+packet["extension"];
            let code = packet["code"]
            console.log(typeof(code));
            fs.writeFile( file_name ,code, ()=>{
            
                const command={
                    "cpp":`clang++ ${file_name} && ./a.out`,
                    "c":`clang ${file_name} && ./a.out`,
                    "java":`javac ${file_name} && java ${filename}`
                }

    
                exec(command[packet["extension"]],
                (error, stdout, stderr)=>{
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);

                let streamsout= {}
                streamsout.stderr=stderr;
                streamsout.stdout=stdout;
                con.send(JSON.stringify(streamsout));
                }
                )})
                    });
    
  })
});



httpserver.listen(port, ()=>console.log(`Server is running on port ${port}`))



// task:currently we are working on a single connection

//final:adddb

//task:multiple files

//x86 and ARM