var fs = require("fs");
const { exec } = require("child_process");


const http = require("http");
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
    con_arr.push({"connection":connection, "file_name": "abcd.cpp"});//add databaseologics

    con_arr.forEach(con => {

        con["connection"].on("open",()=>{
            console.log("Connection open");
            
    })

    con["connection"].on("close", (message) => {
            console.log("Connection closed");
            con_arr.splice(con_arr.indexOf(con["connection"]),1)
    })
            

    
    
        con["connection"].on("message", (message) => {
            console.log("Got a message");
            console.log(message);

            //get file name
            //get file type
            //create file with unique name
            //compile
            //run and call back.
            
            
            fs.writeFile(con["file_name"],message["utf8Data"], ()=>{
            
                exec("gcc abcd.cpp && ./a.out",
                (error, stdout, stderr)=>{
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);

                con["connection"].send(`{"stderr":"${stderr}","stdout":"${stdout}"}`);
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