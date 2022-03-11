import dgram from "dgram"
function sendToRPI_Controller(data, port, host){
    var socket = dgram.createSocket('udp4')
    socket.connect(port,host,(err)=>{
        console.log(err)
    })
    socket.send(data, port, host)
}
export {sendToRPI_Controller}