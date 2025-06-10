import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable, Switch, ScrollView } from 'react-native';
// import { Auth } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
// import axios from 'axios'




export default function Chatbot() {

    // const [token, setToken] = useState("")

    // const auth = getAuth()
    // const user = auth.currentUser

    // if (user) {
    //     user.getIdToken()
    //         .then((token) => {
    //             setToken(token)
    //             console.log("Current user token: ", token)
    //         })
    // }
    // else {
    //     console.log("No user signed in")
    // }



    const scrollViewRef = useRef()

    const [currentConversation, setCurrentConversation] = useState(false)
    const [messageToSend, setMessageToSend] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);

    const [error, setError] = useState(false)
    const [emptyInputError, setEmptyInputError] = useState(false)

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    }, [messageHistory])

    function handleMessageSubmit() {
        setEmptyInputError(false)

        if (messageToSend.trim() === '') {
            setEmptyInputError(true)
            return
        }

        const newMessage = {
            id: messageHistory.length + 1,
            message: messageToSend,
            sentByUser: true
        }


        setMessageHistory((previousHis) => [...previousHis, newMessage])
        setMessageToSend('')

        // const data = {
        //     "messages": messageHistory.map((message) => ({
        //         content: message.message,
        //         role: message.sentByUser ? 'human' : 'ai'
        //     }))
        //         .slice(-10)
        // }

        // return axios.post("http://localhost:8002/api/chat", data, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } })


    }

    return (
        currentConversation ? (
            <View style={styles.container}>
                {/* <Text style={styles.header}>Chatbot</Text> */}

                <View style={styles.messageHistoryContainer}>
                    <ScrollView ref={scrollViewRef}
                    >
                        {messageHistory.map((message, index) => {

                            return (
                                <View key={message.id}
                                    style={[
                                        message.sentByUser ? styles.userBubbleContainer : styles.chatbotBubbleContainer
                                    ]}
                                >
                                    <View
                                        style={[
                                            message.sentByUser ? styles.userBubble : styles.chatbotBubble
                                        ]}
                                    >
                                        <Text style={[
                                            message.sentByUser ? styles.userBubbleText : styles.chatbotBubbleText
                                        ]}>{message.message}</Text>
                                    </View>

                                </View>

                            )

                        }
                        )}

                    </ScrollView>
                </View>


                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Type here."
                        value={messageToSend}
                        onChangeText={setMessageToSend}
                        autoCapitalize="sentences"
                        style={styles.input}
                        onSubmitEditing={handleMessageSubmit}
                    />
                    <Pressable
                        onPress={handleMessageSubmit}>
                        <View style={styles.submitContainer}>
                            <Text style={styles.submitArrow} >↑</Text>
                        </View>
                    </Pressable>
                </View>
                {emptyInputError && <Text style={styles.error}>Please enter a message before submitting.</Text>}
                {error && <Text style={styles.error}>An error occurred, please try again.</Text>}
            </View>
        )
            :
            (
                <View style={styles.container}>
                    <Button title="Start a chat" onPress={() => { setCurrentConversation(!currentConversation) }} />
                </View>
            )
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',

    },
    // header: {
    //     fontSize: 24,
    //     fontWeight: '600',
    //     color: '#333',
    //     textAlign: 'center',
    //     marginBottom: 30
    // },
    messageHistoryContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // borderColor: '#ccc',
        // borderWidth: 1,
        borderRadius: 8,
        margin: 10,
        padding: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        width: '70%'
    },
    error: {
        fontSize: 12,
        fontWeight: '400',
        margin: 20,
        color: 'red',

    },
    userBubbleContainer: {
        alignItems: 'flex-end',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    chatbotBubbleContainer: {
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    userBubble: {
        backgroundColor: '#269FC11A',
        borderRadius: 20,
        padding: 10,
        maxWidth: '70%',

    },
    chatbotBubble: {
        backgroundColor: '#2891D9',
        borderRadius: 20,
        padding: 10,
        maxWidth: '80%',
    },
    userBubbleText: {
        fontSize: 16,
        color: '#2891D9',

    },
    chatbotBubbleText: {
        fontSize: 16,
        color: 'white',
    },
    submitArrow: {
        fontSize: 16,
        padding: 10,
        color: 'white',
    },
    submitContainer: {
        backgroundColor: '#2891D9',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})