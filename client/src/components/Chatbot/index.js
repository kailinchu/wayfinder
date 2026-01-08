import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ site = 'birchmount', data }) => {
  const hospitalName = site.charAt(0).toUpperCase() + site.slice(1);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! I'm the ${hospitalName} Hospital Assistant. I can help you find departments, get information about our services, answer questions about visiting hours and parking, and provide general hospital information. How can I assist you today?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const maxQuestions = 10; // Maximum questions allowed per user per session
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || questionCount >= maxQuestions) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestionCount(prev => prev + 1);  // Increment question count
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, site: site }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.message,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      if (questionCount + 1 >= maxQuestions) {
        const limitMessage = {
          id: Date.now() + 2,
          text: `You've reached the maximum number of questions for today. Please try again later.`,
          isBot: true,
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, limitMessage]);
      }
    } catch (error) {
      console.error('Error calling chat API:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `I'm sorry, I'm having trouble connecting right now. Please try again in a moment or contact the ${hospitalName} Hospital information desk at ${site === 'birchmount' ? '(416) 495-2400' : '(416) 284-8131'} for immediate assistance.`,
        isBot: true,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId, isPositive) => {
    setFeedback(prev => ({
      ...prev,
      [messageId]: isPositive
    }));
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
    // Temporary analytics logging (e.g., fire-and-forget method for analytics)
    fetch('/api/log-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messageId,
        feedback: isPositive ? 'positive' : 'negative',
        timestamp: new Date()
      })
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = site === 'birchmount' ? [
    "Where is the pharmacy?",
    "How do I get to the emergency department?",
    "Where can I find parking?",
    "What are the visiting hours?",
    "Where is the cafeteria?",
    "How do I get to diagnostic imaging?"
  ] : [
    "Where is the main entrance?",
    "What are the visiting hours?", 
    "Where can I find parking?",
    "What services are available?",
    "How do I contact patient information?",
    "Where is the registration desk?"
  ];

  const handleQuickAction = (action) => {
    setInputValue(action);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: `Hello! I'm the ${hospitalName} Hospital Assistant. I can help you find departments, get information about our services, answer questions about visiting hours and parking, and provide general hospital information. How can I assist you today?`,
        isBot: true,
        timestamp: new Date()
      }
    ]);
    setFeedback({});
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px', 
      margin: '2rem auto', 
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#474B8E',
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: '0',
        borderRadius: '8px 8px 0 0',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            backgroundColor: '#48beb0',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px'
          }}>
            🤖
          </div>
          <div>
            <h1 style={{ 
              color: 'white', 
              fontWeight: 600, 
              margin: 0, 
              fontSize: '2rem',
              fontFamily: 'inherit'
            }}>
              Hospital Assistant
            </h1>
            <p style={{ 
              color: 'rgba(255,255,255,0.9)', 
              margin: 0,
              fontSize: '1.1rem'
            }}>
              {hospitalName} Hospital - SHN
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          style={{
            position: 'absolute',
            right: '24px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          title="Clear conversation"
        >
          🗑️
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0',
          boxShadow: 'none'
        }}>
          <div 
            style={{
              backgroundColor: '#f8f9fa',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: showQuickActions ? '1px solid #e0e0e0' : 'none'
            }}
            onClick={() => setShowQuickActions(!showQuickActions)}
          >
            <span style={{ fontWeight: 600, color: '#474B8E' }}>Quick Questions</span>
            <span style={{ 
              color: '#48beb0', 
              transform: showQuickActions ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}>
              ▼
            </span>
          </div>
          {showQuickActions && (
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '16px'
            }}>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      border: '1px solid #48beb0',
                      backgroundColor: 'transparent',
                      color: '#474B8E',
                      borderRadius: '16px',
                      padding: '6px 12px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#48beb0';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#474B8E';
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ height: '1px', backgroundColor: '#e0e0e0' }}></div>

        <div style={{ 
          height: '400px', 
          overflowY: 'auto', 
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{ 
              display: 'flex', 
              justifyContent: message.isBot ? 'flex-start' : 'flex-end' 
            }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: message.isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                backgroundColor: message.isBot ? '#f0f0f0' : '#48beb0',
                color: message.isBot ? '#474B8E' : 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                ...(message.isError && { 
                  backgroundColor: '#ffebee', 
                  color: '#c62828',
                  border: '1px solid #ffcdd2'
                })
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  {message.isBot && (
                    <div style={{
                      backgroundColor: '#48beb0',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      flexShrink: 0
                    }}>
                      🤖
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      whiteSpace: 'pre-wrap', 
                      wordBreak: 'break-word',
                      lineHeight: 1.4
                    }}>
                      {message.text}
                    </div>
                    <div style={{ 
                      opacity: 0.7, 
                      marginTop: '4px', 
                      fontSize: '0.75rem' 
                    }}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
                
                {message.isBot && !message.isError && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '4px', 
                    marginTop: '8px', 
                    justifyContent: 'flex-end' 
                  }}>
                    <button
                      onClick={() => handleFeedback(message.id, true)}
                      style={{ 
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        opacity: feedback[message.id] === true ? 1 : 0.6,
                        color: feedback[message.id] === true ? '#48beb0' : 'inherit'
                      }}
                      title="Helpful"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, false)}
                      style={{ 
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        opacity: feedback[message.id] === false ? 1 : 0.6,
                        color: feedback[message.id] === false ? '#c62828' : 'inherit'
                      }}
                      title="Not helpful"
                    >
                      👎
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '18px 18px 18px 4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  backgroundColor: '#48beb0',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  🤖
                </div>
                <div style={{ 
                  color: '#474B8E',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>Typing</span>
                  <div style={{
                    display: 'flex',
                    gap: '2px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#48beb0',
                      borderRadius: '50%',
                      animation: 'pulse 1.4s ease-in-out infinite'
                    }}></div>
                    <div style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#48beb0',
                      borderRadius: '50%',
                      animation: 'pulse 1.4s ease-in-out 0.2s infinite'
                    }}></div>
                    <div style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#48beb0',
                      borderRadius: '50%',
                      animation: 'pulse 1.4s ease-in-out 0.4s infinite'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ height: '1px', backgroundColor: '#e0e0e0' }}></div>

        <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#48beb0',
              fontSize: '20px',
              pointerEvents: 'none'
            }}>
              🔍
            </div>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about the hospital..."
              disabled={isLoading}
              rows="1"
              style={{
                width: '100%',
                minHeight: '48px',
                padding: '12px 80px 12px 45px',
                border: '2px solid #48beb0',
                borderRadius: '24px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                backgroundColor: isLoading ? '#f5f5f5' : 'white',
                color: '#474B8E',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#48beb0'}
              onBlur={(e) => e.target.style.borderColor = '#48beb0'}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#48beb0',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                transition: 'all 0.2s',
                opacity: (isLoading || !inputValue.trim()) ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (!isLoading && inputValue.trim()) {
                  e.target.style.backgroundColor = '#3a9b8e';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#48beb0';
              }}
            >
              ➤
            </button>
          </div>
          
          <div style={{ 
            color: '#666', 
            marginTop: '8px', 
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            💡 I can help with directions, services, hours, and general hospital information from {hospitalName} Hospital.
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 80%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            40% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
