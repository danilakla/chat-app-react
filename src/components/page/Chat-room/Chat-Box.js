import React, {useEffect, useRef, useState} from 'react';
import {ChatFeed, Message} from "react-chat-ui";
import socket from "../../../socket/socket.io";
import {useParams} from 'react-router-dom'

const ChatBox = () => {
    const friendId = useParams().socketId

    const socketConnection = useRef();

    const [messages, setMessages] = useState([])
    const [message, setMessageOne] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        socketConnection.current = socket(token).connect()
        socketConnection.current.emit('init-room-user')

        socketConnection.current.emit('init-message', friendId)

        socketConnection.current.on('messages', (messagesFormServer) => {
            console.log(messagesFormServer)
            if (messagesFormServer) {
                const messagesFromRedis = messagesFormServer.reverse().map((mess) => {
                    let senderId = 0;
                    if (mess.from === friendId) {
                        console.log('other side')
                        senderId = 1
                    }
                    return new Message({
                        id: senderId,
                        message: mess.message,
                        senderName: senderId ? 'Friend' : 'You'
                    });

                })

                setMessages([...messagesFromRedis])
            }


        })

    }, [])
    useEffect(() => {
        socketConnection.current.on('take-message', (messageFromServer) => {
            let senderId = 0;
            if (messageFromServer.from == friendId) {
                senderId = 1
            }
            console.log(messageFromServer)
            pushMessage(messageFromServer.message, senderId)

        })

    }, [messages])

    function onMessageSubmit(e) {

        const input = message;
        e.preventDefault();

        if (!input.value) {
            console.log('one side')
            return false;
        }
        socketConnection.current.emit('create-message', {from: null, to: friendId, message: input.value})
        pushMessage(input.value);

        input.value = "";
        return true;
    }

    function pushMessage(message, id = 0) {
        const newMessage = new Message({
            id,
            message,
            senderName: id ? 'Friend' : 'You' //STATE
        });
        console.log(newMessage)
        console.log(newMessage)
        setMessages([...messages, newMessage])


    }


    return (
        <div className="container">
            <div className="chatfeed-wrapper">
                <ChatFeed
                    chatBubble={false}
                    maxHeight={250}
                    messages={messages} // Boolean: list of message objects
                    showSenderName
                />

                <form onSubmit={e => {
                    onMessageSubmit(e)
                }}>
                    <input
                        ref={m => {
                            setMessageOne(m);
                        }}
                        placeholder="Type a message..."
                        className="message-input"
                    />
                </form>


                <div
                    style={{display: "flex", justifyContent: "center", marginTop: 10}}
                >

                </div>
            </div>
        </div>

    )
}

export default ChatBox;