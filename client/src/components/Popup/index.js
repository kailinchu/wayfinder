import ChatBot from "react-chatbotify";
import './style.css';
import settings from './settings.json' ;
import themes from './style.json';

async function apiMessageResponse(params) {
  try {
    const response = await fetch('/api/chat',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: params.userInput,
        site: params.site
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.message;
    
  } catch (error) {
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
}

const ChatBotPopup = ( { site } ) => {
  const flow = {
    start: {
      message: "Hey, I'm the SHN WayFinder ChatBot. You can ask me questions about how to navigate the hospital.",
      path: "conversation"
    },
    conversation: {
      message: (params) => apiMessageResponse({ ...params, site }), 
      path: "conversation"
    },
    end: {
      message: "Thank you for using the SHN WayFinder ChatBot! If you have any more questions, feel free to ask.",
      chatDisabled: true
    }
  };

  return (
    <ChatBot themes={themes} settings={settings} flow={flow}/>
  );
};

export default ChatBotPopup;
