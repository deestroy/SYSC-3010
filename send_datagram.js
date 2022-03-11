import dgram from "dgram"
function sendToRPI_Controller(data, port, host){
    var socket = dgram.createSocket('udp4')
    socket.send(Buffer.from(data), port, host)
}
export {sendToRPI_Controller}