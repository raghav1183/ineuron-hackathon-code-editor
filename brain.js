let editor = document.getElementById("editor");
let terminal = document.getElementById("terminal");

let websocket = new WebSocket('ws://localhost:3003/');
websocket.onmessage=message=>{/*output shall be rendered on the terminal*/
    terminal.innerHTML=message.data;//to safe html function.
    terminal.style.color=errWarn(message.data)
    // terminal.style.color="green";
    console.log(message);
}


function errWarn(mes){
    console.log(mes);
    let JSONmess=JSON.parse(mes);
    let color="yellow";
    if(JSONmess["stderr"].length != 0 && JSONmess["stdout"].length==0) color = "red";
    console.log(color);
    return color;
}


editor.addEventListener("input",()=>websocket.send(editor.value))
