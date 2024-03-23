// // import React, { useState, useEffect } from 'react';
// // import { View, StyleSheet } from 'react-native';
// // import { GiftedChat } from 'react-native-gifted-chat';
// // import axios from 'axios';

// // const VirtualAssistant = () => {
// //     const [messages, setMessages] = useState([]);
// //     const [inputText, setInputText] = useState('');

// //     useEffect(() => {
// //         setMessages([
// //             {
// //                 _id: 1,
// //                 text: "🐱 Welcome to our Cat Care Assistant! How can I assist you today?",
// //                 createdAt: new Date(),
// //                 user: {
// //                     _id: 2,
// //                     name: 'Virtual Assistant',
// //                 },
// //             },
// //         ]);
// //     }, []);

// //     const sendMessage = async () => {
// //         const userMessage = {
// //             _id: messages.length + 1,
// //             text: inputText,
// //             createdAt: new Date(),
// //             user: {
// //                 _id: 1,
// //                 name: 'User',
// //             },
// //         };
// //         setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
// //         setInputText('');

// //         try {
// //             const response = await axios.post(
// //                 'https://api.openai.com/v1/chat/completions',
// //                 {
// //                     model: 'text-davinci-003',
// //                     messages: [
// //                         {
// //                             role: 'system',
// //                             content: 'You: ' + inputText,
// //                         },
// //                     ],
// //                 },
// //                 {
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         'Authorization': 'Bearer sk-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', // Replace with your API key
// //                     },
// //                 }
// //             );

// //             const botMessage = {
// //                 _id: messages.length + 2,
// //                 text: response.data.choices[0].message.content,
// //                 createdAt: new Date(),
// //                 user: {
// //                     _id: 2,
// //                     name: 'Virtual Assistant',
// //                 },
// //             };
// //             setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
// //         } catch (error) {
// //             console.error('Error sending message:', error);
// //         }
// //     };

// //     return (
// //         <View style={styles.container}>
// //             <GiftedChat
// //                 messages={messages}
// //                 onSend={messages => sendMessage(messages[0].text)}
// //                 user={{
// //                     _id: 1,
// //                     name: 'User',
// //                 }}
// //                 textInputProps={{ placeholder: 'Type a message...' }}
// //             />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#e0dcd8',
// //     },
// // });

// // export default VirtualAssistant;






// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import axios from 'axios';

// const VirtualAssistant = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputText, setInputText] = useState('');
//     const [model, setModel] = useState('chatgpt'); // Default to ChatGPT

//     useEffect(() => {
//         setMessages([
//             {
//                 _id: 1,
//                 text: "🐱 Welcome to our Cat Care Assistant! How can I assist you today?",
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'Virtual Assistant',
//                 },
//             },
//         ]);
//     }, []);

//     const sendMessage = async () => {
//         const userMessage = {
//             _id: messages.length + 1,
//             text: inputText,
//             createdAt: new Date(),
//             user: {
//                 _id: 1,
//                 name: 'User',
//             },
//         };
//         setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
//         setInputText('');

//         try {
//             let response;
//             if (model === 'chatgpt') {
//                 response = await axios.post(
//                     'https://api.openai.com/v1/chat/completions',
//                     {
//                         model: 'text-davinci-003',
//                         messages: [
//                             {
//                                 role: 'system',
//                                 content: 'You: ' + inputText,
//                             },
//                         ],
//                     },
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': 'Bearer mCRYi9c7sDGIU1NPWoT6T3BlbkFJcCwuhXIT9qKKHVsYmU9q', // Replace with your API key
//                         },
//                     }
//                 );
//             } else if (model === 'gemini') {
//                 // Include code for using Gemini model here
//             }

//             const botMessage = {
//                 _id: messages.length + 2,
//                 text: response.data.choices[0].message.content,
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'Virtual Assistant',
//                 },
//             };
//             setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.buttonContainer}>
//                 <Button title="ChatGPT" onPress={() => setModel('chatgpt')} />
//                 {/* Add button for selecting Gemini model */}
//             </View>
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => sendMessage(messages[0].text)}
//                 user={{
//                     _id: 1,
//                     name: 'User',
//                 }}
//                 textInputProps={{ placeholder: 'Type a message...' }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#e0dcd8',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
// });

// export default VirtualAssistant;











// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

// const API_KEY = "sk-AIzaSyBPIrX9Q37eviCpcKfCdESdCj0zE5VhA8g";

// const systemMessage = { "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience." };

// const VirtualAssistant = () => {
//     const [messages, setMessages] = useState([
//         { message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "just now", sender: "ChatGPT" }
//     ]);
//     const [isTyping, setIsTyping] = useState(false);

//     const handleSend = async (message) => {
//         const newMessage = { message, direction: 'outgoing', sender: "user" };
//         const newMessages = [...messages, newMessage];
//         setMessages(newMessages);
//         setIsTyping(true);
//         await processMessageToChatGPT(newMessages);
//     };

//     async function processMessageToChatGPT(chatMessages) {
//         let apiMessages = chatMessages.map((messageObject) => {
//             let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//             return { role: role, content: messageObject.message }
//         });

//         const apiRequestBody = {
//             "model": "gpt-3.5-turbo",
//             "messages": [systemMessage, ...apiMessages]
//         }

//         await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": "Bearer " + API_KEY,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(apiRequestBody)
//         }).then((data) => {
//             return data.json();
//         }).then((data) => {
//             setMessages([...chatMessages, { message: data.choices[0].message.content, sender: "ChatGPT" }]);
//             setIsTyping(false);
//         });
//     }

//     return (
//         <View style={styles.container}>
//             <MainContainer>
//                 <ChatContainer>
//                     <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
//                         {messages.map((message, i) => {
//                             return <Message key={i} model={message} />;
//                         })}
//                     </MessageList>
//                     <MessageInput placeholder="Type message here" onSend={handleSend} />
//                 </ChatContainer>
//             </MainContainer>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//     },
// });

// export default VirtualAssistant;

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import axios from 'axios';

// const API_KEY = "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";

// const systemMessage = { role: 'system', content: "Explain things like you're talking to a software professional with 2 years of experience." };

// const VirtualAssistant = () => {
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         setMessages([
//             {
//                 _id: Math.random().toString(36).substring(7), // Generate a unique ID
//                 text: "Hello, I'm ChatGPT! I can help you with questions about cat health and cat care.",
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'ChatGPT',
//                 },
//             },
//         ]);
//     }, []);

//     const handleSend = async (messages) => {
//         const userMessage = messages[0];
//         setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));

//         // Rate limiter to prevent sending too many requests to the API
//         const delay = 1000; // 1 second delay between requests
//         setTimeout(async () => {
//             try {
//                 const response = await axios.post(
//                     'https://api.openai.com/v1/chat/completions',
//                     {
//                         model: 'gpt-3.5-turbo',
//                         messages: [systemMessage, { role: 'user', content: userMessage.text }],
//                         // Restrict the model to only generate responses related to cat health and cat care
//                         prompt: {
//                             context: "",
//                             examples: [
//                                 {
//                                     input: {
//                                         content: "My cat has been vomiting and has diarrhea. What should I do?"
//                                     },
//                                     output: {
//                                         content: "You should take your cat to the vet as soon as possible. Vomiting and diarrhea can be signs of a serious illness."
//                                     }
//                                 },
//                                 {
//                                     input: {
//                                         content: "What is the best way to groom my cat?"
//                                     },
//                                     output: {
//                                         content: "The best way to groom your cat is to brush its fur regularly to remove loose hair and prevent mats. You should also bathe your cat every few months."
//                                     }
//                                 }
//                             ],
//                             instructions: "I can only answer questions about cat health and cat care. If you have a question about something else, please ask a human."
//                         }
//                     },
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': 'Bearer ' + API_KEY,
//                         },
//                     }
//                 );

//                 const botMessage = {
//                     _id: Math.random().toString(36).substring(7), // Generate a unique ID
//                     text: response.data.choices[0].message.content,
//                     createdAt: new Date(),
//                     user: {
//                         _id: 2,
//                         name: 'ChatGPT',
//                     },
//                 };
//                 setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         }, delay);
//     };

//     return (
//         <View style={styles.container}>
//             <GiftedChat
//                 messages={messages}
//                 onSend={handleSend}
//                 user={{
//                     _id: 1,
//                     name: 'User',
//                 }}
//                 placeholder='Type message here'
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
// });

// export default VirtualAssistant;




// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyD20ET_O7LtynOMSQXrgbVWhcSf748KAAA";
// const MODEL_NAME = "gemini-nano";

// const systemMessage = { role: 'system', content: "Explain things like you're talking to a software professional with 2 years of experience." };

// const VirtualAssistant = () => {
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         setMessages([
//             {
//                 _id: Math.random().toString(36).substring(7), // Generate a unique ID
//                 text: "Hello, I'm Gemini! I can help you with questions about cat health and cat breeding.",
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'Gemini',
//                 },
//             },
//         ]);
//     }, []);

//     const handleSend = async (messages) => {
//         const userMessage = messages[0];
//         setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));

//         try {
//             // Initialize the GoogleGenerativeAI class with the API key
//             const genAI = new GoogleGenerativeAI(API_KEY);

//             // Check if the model is available
//             const models = await genAI.listModels();
//             const model = models.find(model => model.name === MODEL_NAME);

//             if (!model) {
//                 alert(`The model ${MODEL_NAME} is not available in the current API version.`);
//                 return;
//             }

//             const generationConfig = {
//                 temperature: 0.3,
//                 topK: 1,
//                 topP: 1,
//                 maxOutputTokens: 2048,
//             };

//             const safetySettings = [
//                 {
//                     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//                     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//                 },
//                 {
//                     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//                     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//                 },
//                 {
//                     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//                     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//                 },
//                 {
//                     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//                     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//                 },
//             ];

//             const chat = model.startChat({
//                 generationConfig,
//                 safetySettings,
//                 history: [],
//             });

//             const result = await chat.sendMessage(userMessage.text);
//             const botMessage = {
//                 _id: Math.random().toString(36).substring(7),
//                 text: result.response.text(),
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'Gemini',
//                 },
//             };
//             setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
//         } catch (error) {
//             console.error('Error sending message:', error);
//             alert('Sorry, there was an unexpected error. Please try again later.');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <GiftedChat
//                 messages={messages}
//                 onSend={handleSend}
//                 user={{
//                     _id: 1,
//                     name: 'User',
//                 }}
//                 placeholder='Type message here'
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
// });




import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { Text } from 'react-native';

const OPENAI_API_KEY = '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'; // Replace with your actual OpenAI API key

const VirtualAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null); // State to hold error message

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello! I am your virtual assistant.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = async (newMessages = []) => {
        setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, newMessages)
        );

        const messageText = newMessages[0].text;

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/completions', // Corrected endpoint
                {
                    model: 'gpt-3.5-turbo',
                    prompt: messageText,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    },
                }
            );

            const botResponse = response.data.choices[0].text.trim();

            setMessages((prevMessages) =>
                GiftedChat.append(prevMessages, [
                    {
                        _id: Math.random(),
                        text: botResponse,
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'React Native',
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                    },
                ])
            );

            setError(null); // Clear error if request succeeds
        } catch (error) {
            setError('Error fetching response from OpenAI'); // Set error message
        }
    };

    return (
        <>
            {error && <Text>{error}</Text>}
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: 1,
                }}
            />
        </>
    );
};

export default VirtualAssistant;
