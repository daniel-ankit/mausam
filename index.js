const express = require('express');
const http = require('http');
const PORT = process.env.port || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
});

server.listen(PORT, ()=>{
    console.log("Listening on port ", PORT);
})