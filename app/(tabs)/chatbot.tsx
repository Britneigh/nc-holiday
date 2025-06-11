import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { getTrips } from '@/firestoreService/trip/getTrips';

// Define the "shape" of a message object for TypeScript
type Message = {
  id: string;
  message: string;
  sentByUser: boolean;
  isError?: boolean;
};

export default function Chatbot() {

  const [authStatus, setAuthStatus] = useState<'LOADING' | 'AUTHENTICATED' | 'NO_USER'>('LOADING');
  const [token, setToken] = useState<string>("");
  const [tripData, setTripData] = useState<any[]>([]);
  
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [messageToSend, setMessageToSend] = useState('');
  const [currentConversation, setCurrentConversation] = useState(false);
  const [error, setError] = useState<string | boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Auth state: User is signed in.");
        try {
          const idToken = await user.getIdToken(true);
          setToken(idToken);
          const trips = await getTrips();
          setTripData(trips);
          setAuthStatus('AUTHENTICATED');
        } catch (err) {
          console.error("Error during setup:", err);
          setAuthStatus('NO_USER');
        }
      } else {
        console.log("Auth state: No user signed in.");
        setToken("");
        setTripData([]);
        setAuthStatus('NO_USER');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messageHistory]);

  const agentSubmit = () => {

    if (messageToSend.trim() === '' || authStatus !== 'AUTHENTICATED') return;

    const userMessage: Message = { id: `user-${Date.now()}`, message: messageToSend, sentByUser: true };
    const updatedHistory = [...messageHistory, userMessage];
    
    setMessageHistory(updatedHistory);
    setMessageToSend('');

    const dataForApi = {
      messages: updatedHistory.map(msg => ({ content: msg.message, role: msg.sentByUser ? 'user' : 'assistant' })).slice(-20),
      trips: tripData,
    };

    axios.post("http://127.0.0.1:8002/api/agent", dataForApi, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(response => {
      if (response.data && response.data.response) {
        const aiMessage: Message = { id: `ai-${Date.now()}`, message: response.data.response, sentByUser: false };
        setMessageHistory(prev => [...prev, aiMessage]);
      }
    }).catch(apiError => {
      console.error("Error calling backend API:", apiError);
      setError("An error occurred, please try again.");
      const errorMessage: Message = { id: `error-${Date.now()}`, message: "Error: Could not get a response.", sentByUser: false, isError: true };
      setMessageHistory(prev => [...prev, errorMessage]);
    });
  };

  if (authStatus === 'LOADING') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2891D9" />
        <Text style={{ marginTop: 10, color: '#333' }}>Authenticating...</Text>
      </View>
    );
  }

  if (authStatus === 'NO_USER') {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Please sign in to use the travel agent.</Text>
      </View>
    );
  }

  return (
    currentConversation ? (
      <View style={styles.container}>
        <View style={styles.messageHistoryContainer}>
          <ScrollView ref={scrollViewRef}>
            {messageHistory.map((message) => (
              <View key={message.id} style={message.sentByUser ? styles.userBubbleContainer : styles.chatbotBubbleContainer}>
                <View style={message.sentByUser ? styles.userBubble : styles.chatbotBubble}>
                  <Text style={message.sentByUser ? styles.userBubbleText : styles.chatbotBubbleText}>
                    {message.message}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type here."
            value={messageToSend}
            onChangeText={setMessageToSend}
            autoCapitalize="sentences"
            style={styles.input}
            onSubmitEditing={agentSubmit}
          />
          <Pressable onPress={agentSubmit}>
            <View style={styles.submitContainer}>
              <Text style={styles.submitArrow}>↑</Text>
            </View>
          </Pressable>
        </View>
        {error && <Text style={styles.error}>{error.toString()}</Text>}
      </View>
    ) : (
      <View style={styles.container}>
        <Button title="Start a chat with your Travel Agent" onPress={() => setCurrentConversation(true)} />
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
    messageHistoryContainer: {
        flex: 1,
        justifyContent: 'flex-end',
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
        textAlign: 'center'
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
});