import React from "react";
// import ChatFeed from "react-chat-ui";/
import {ChatFeed, ChatBubble, BubbleGroup, Message} from "react-chat-ui";
import "./styles.css";
import {useEffect} from 'react'

const styles = {
    button: {
        backgroundColor: "#fff",
        borderColor: "#1D2129",
        borderStyle: "solid",
        borderRadius: 20,
        borderWidth: 2,
        color: "#1D2129",
        fontSize: 18,
        fontWeight: "300",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        outline: "none"
    },
    selected: {
        color: "#fff",
        backgroundColor: "#0084FF",
        borderColor: "#0084FF"
    }
};

const users = {
    you: 0,
    friend: 1,
};


class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            curr_user: users.you
        };
    }



    onMessageSubmit(e) {
        const input = this.message;
        e.preventDefault();
        if (!input.value) {
            console.log('one side')
            return false;
        }
        console.log('other side')

        this.pushMessage(this.state.curr_user, input.value);
        input.value = "";
        return true;
    }

    pushMessage(recipient, message) {
        const prevState = this.state;
        const newMessage = new Message({
            id: recipient,
            message,
            senderName: users[recipient]
        });
        prevState.messages.push(newMessage);
        this.setState(this.state);
    }

    render() {
        return (
            <div className="container">
                <div className="chatfeed-wrapper">
                    <ChatFeed
                        chatBubble={this.state.useCustomBubble}
                        maxHeight={250}
                        messages={this.state.messages} // Boolean: list of message objects
                        showSenderName
                    />

                    <form onSubmit={e => this.onMessageSubmit(e)}>
                        <input
                            ref={m => {
                                this.message = m;
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
        );
    }
}

export default Chat;
