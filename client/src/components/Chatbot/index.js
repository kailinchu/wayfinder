import ChatBot from "react-chatbotify";
import './style.css';
import settings from './settings.json' ;
import themes from './style.json';

const ShnChatBot = () => {
    const flow = {
        start: {
        message: "Hey, I'm the SHN WayFinder ChatBot. You can ask me questions about how to navigate the hospital.",
        path: "end"
        },
        end: {
        message: "I see, good bye!",
        chatDisabled: true
        }
    }

  return (
    <ChatBot themes={themes} settings={settings} flow={flow}/>
  );
};


export default ShnChatBot;
