import { useEffect, useState } from "react";
import "./Chat.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchData } from "../../apis/fetchData";

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage during the initial render
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [sessionId] = useState(Math.random().toString(36).substring(2, 15));
  const [loading, setLoading] = useState(false);

  // Save messages to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (loading || !input.trim()) return;

    // Add the user's message
    const userMessage = { sender: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    try {
      const data = await fetchData({
        url: `${process.env.REACT_APP_BACKEND_DOMAIN}/chat`,
        body: {
          query: input,
          session_id: sessionId,
          patient_id: "P-386725"
        }
      });

      // Add the bot's response
      const botMessage = { sender: "bot", content: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = {
        sender: "bot",
        content: "I'm sorry, I didn't understand your request. Could you please rephrase it?"
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
    setInput("");
  };

  const handleKeyPress = (event) => {
    if (loading) return;
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="floating-chat">
      {!isOpen && (
        <button className="chat-icon" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen ? (
        <div className="chat-window">
          <div className="chatbot-container">
            <div className="header-container">
              <div>Chat</div>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                style={{
                  position: "absolute",
                  right: "20px",
                  fontSize: "24px",
                  color: "red"
                }}>
                ✖
              </button>
            </div>

            <div className="chat-content-container">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                  dangerouslySetInnerHTML={{ __html: msg.content }} // Render HTML from response
                />
              ))}

              {/* Show loader when API is loading */}
              {loading && (
                <div className="edc-loader">
                  <div className="dot dot1"></div>
                  <div className="dot dot2"></div>
                  <div className="dot dot3"></div>
                </div>
              )}
            </div>

            <div className="footer-container">
              <div className="footer">
                <input
                  type="text"
                  placeholder="Ask Me Something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="query-input"
                />
              </div>

              <div className="send-button-container" onClick={handleSendMessage}>
                <i className="fas fa-paper-plane" style={{ color: "white" }}></i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
