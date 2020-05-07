let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

io.on("connection", socket => {
    // Registro cada vez que una usuario se conecta
    console.log("user connected");

    // Inicie sesi�n cada vez que un cliente se desconecte de nuestro servidor websocket
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });

    // Cuando recibamos un evento de "mensaje" de nuestro cliente, imprímalo
    // el contenido de ese mensaje y luego repetirlo a nuestro cliente usando `io.emit ()`
    socket.on("message", message => {
        console.log("Message Received: " + message);
        io.emit("message", { type: "new-message", text: message });
    });
});

// Inicializa nuestro servidor websocket en el puerto 5000
http.listen(5000, () => {
    console.log("started on port 5000");
});
