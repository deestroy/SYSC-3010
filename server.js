const express = require('express');
const server = express();

server.get('/',(req,res)=>{
    res.send('A simple Node app is runing on this server')
    res.end();
})
const PORT = process.env.PORT ||5000;
server.listen(PORT, console.log(`Server started  on port ${PORT}`))
