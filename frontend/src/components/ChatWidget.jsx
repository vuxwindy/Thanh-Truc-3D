import { useState, useEffect, useRef } from 'react';
import '../assets/css/ChatWidget.css';
import { useChatContext } from '../contexts/ChatContext';

// Sample prompt suggestions to help users get started
const SAMPLE_PROMPTS = [
  "Bạn có thể giúp tôi mua sắm không?",
  "Sản phẩm nào đang được giảm giá?",
  "Làm thế nào để đặt hàng?",
  "Các chính sách vận chuyển của shop?"
];

const ChatWidget = () => {
  const {
    conversationId,
    messages,
    isOpen,
    isLoading,
    setIsOpen,
    sendMessage,
    endConversation,
    rateConversation
  } = useChatContext();
  
  const [inputValue, setInputValue] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current && !showRating) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, showRating]);

  // Hide prompt suggestions after first message
  useEffect(() => {
    if (messages.length > 1) {
      setShowPromptSuggestions(false);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleEndConversation = async () => {
    setShowRating(true);
  };

  const handleSubmitRating = async () => {
    await rateConversation(rating, feedback);
    setShowRating(false);
    await endConversation();
  };

  const handleSkipRating = async () => {
    setShowRating(false);
    await endConversation();
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Handle clicking on a sample prompt
  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
    inputRef.current.focus();
  };

  // Format message text with line breaks
  const formatMessageText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="chat-widget">
      <button 
        className="chat-button" 
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-container">
          {!showRating ? (
            <>
              <div className="chat-header">
                <div className="chat-header-title">
                  <div className="ai-indicator">
                    <span className="ai-dot"></span>
                    <span>AI</span>
                  </div>
                  <h3>Trợ lý AI Web2D</h3>
                </div>
                {conversationId && (
                  <button 
                    className="end-chat-btn" 
                    onClick={handleEndConversation}
                    aria-label="End conversation"
                  >
                    Kết thúc
                  </button>
                )}
              </div>
              
              <div className="chat-messages">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    {formatMessageText(message.text)}
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot-message typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
                {showPromptSuggestions && !isLoading && messages.length <= 1 && (
                  <div className="prompt-suggestions">
                    <p>Bạn có thể hỏi:</p>
                    <div className="suggestion-buttons">
                      {SAMPLE_PROMPTS.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(prompt)}
                          className="suggestion-btn"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  disabled={isLoading}
                  ref={inputRef}
                  aria-label="Chat message"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                >
                  Gửi
                </button>
              </form>
              <div className="powered-by">
                Powered by Google Gemini
              </div>
            </>
          ) : (
            <div className="rating-container">
              <h3>Đánh giá cuộc trò chuyện</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${rating >= star ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Góp ý thêm (không bắt buộc)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
              ></textarea>
              <div className="rating-buttons">
                <button onClick={handleSubmitRating}>
                  Gửi đánh giá
                </button>
                <button className="skip-btn" onClick={handleSkipRating}>
                  Bỏ qua
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 