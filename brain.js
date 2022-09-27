let editor = document.getElementById("editor");
let terminal = document.getElementById("terminal-out");
let language = document.getElementById("language")
let file_name_input = document.getElementById("file_name")
let packet = {
    "code":"code here",
    "file_name":"",
    "extension":"",
}


let file_name="";



packet.extension=language.value;


let websocket = new WebSocket('ws://localhost:3003/');
websocket.onmessage=message=>{/*output shall be rendered on the terminal*/
    terminal.innerHTML=message.data;//to safe html function.
    terminal.style.color=getTerminalColor(message.data)

    let Jmessage=JSON.parse(message.data)
    terminal.innerHTML=Jmessage["stderr"]+Jmessage["stdout"];
    // terminal.style.color="green";
    console.log(message);
}


function getTerminalColor(mes){
    console.log(mes);
    let JSONmess=JSON.parse(mes);
    let color="yellow";
    if(JSONmess["stderr"].length != 0) color = "red";
    console.log(color);
    return color;
}

language.addEventListener("change",
()=>{packet.extension=language.value
websocket.send(JSON.stringify(packet))}
)


editor.addEventListener("input",()=>{
packet.code = editor.value;
websocket.send(JSON.stringify(packet))
}
)

file_name_input.addEventListener("input",()=>
{
    packet.file_name=file_name_input.value;
}
)


