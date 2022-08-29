import { io } from "socket.io-client";

const socket = (token) =>
    new io('http://localhost:7000', {
        autoConnect: false,
        transports:['websocket'],
        withCredentials: true,
        auth: {
            token
        },
    });

export default socket;