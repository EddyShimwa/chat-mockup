import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import SettingsPanel from "./SettingsPanel";
import Message from "./Message";
import SOUND from "../assets/mixkit-correct-answer-tone-2870.mp3";

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("chatbot-theme", false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage(
    "chatbot-notifications",
    true
  );
  const [headerColor, setHeaderColor] = useLocalStorage(
    "chatbot-header-color",
    "bg-gray-800"
  );
  const [fontSize, setFontSize] = useLocalStorage(
    "chatbot-font-size",
    "text-base"
  );
  const [chatBubbleColor, setChatBubbleColor] = useLocalStorage(
    "chatbot-bubble-color",
    "bg-blue-500"
  );

  const [chatWindowSize, setChatWindowSize] = useLocalStorage(
    "chatbot-window-size",
    "medium"
  );
  const [soundNotificationsEnabled, setSoundNotificationsEnabled] =
    useLocalStorage("chatbot-sound-notifications", true);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const toggleSoundNotifications = () =>
    setSoundNotificationsEnabled((prev) => !prev);

  const playSound = () => {
    const audio = new Audio(SOUND);
    audio.play();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        isBot: false,
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");
      setTimeout(() => setIsBotTyping(true), 3000);

      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          isBot: true,
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
        setIsBotTyping(false);

        if (soundNotificationsEnabled) {
          playSound();
        }
      }, 5000);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  const getChatWindowSizeClass = () => {
    switch (chatWindowSize) {
      case "small":
        return "w-2/4";
      case "medium":
        return "w-3/5";
      case "large":
        return "w-4/5";
      default:
        return "w-3/5";
    }
  };

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {isChatOpen && (
        <div
          className={`fixed bottom-24 right-8 ${getChatWindowSizeClass()} rounded-xl shadow-xl flex flex-col z-50 ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          <div
            className={`p-4 rounded-t-xl flex justify-between items-center ${headerColor} text-white`}
          >
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="hover:bg-gray-2 rounded-md transition-colors text-3xl"
            >
              ⚙️
            </button>

            <h3 className="font-semibold">Support Chat</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsChatOpen(false)}
                className=" hover:bg-gray-2 rounded-md transition-colors text-3xl"
              >
                ×
              </button>
            </div>
          </div>
          <div className="flex-1 flex">
            {isSettingsOpen && (
              <SettingsPanel
                isDarkTheme={isDarkTheme}
                toggleTheme={toggleTheme}
                headerColor={headerColor}
                setHeaderColor={setHeaderColor}
                notificationsEnabled={notificationsEnabled}
                toggleNotifications={toggleNotifications}
                soundNotificationsEnabled={soundNotificationsEnabled}
                toggleSoundNotifications={toggleSoundNotifications}
                fontSize={fontSize}
                setFontSize={setFontSize}
                chatBubbleColor={chatBubbleColor}
                setChatBubbleColor={setChatBubbleColor}
                chatWindowSize={chatWindowSize}
                setChatWindowSize={setChatWindowSize}
              />
            )}

            <div
              className="flex-1 flex flex-col p-4 h-96 overflow-y-auto"
              ref={chatContainerRef}
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    isDarkTheme={isDarkTheme}
                    fontSize={fontSize}
                    chatBubbleColor={chatBubbleColor}
                  />
                ))
              )}
              {isBotTyping && (
                <div className="flex justify-start mb-4">
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      isDarkTheme
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`border-t p-4 ${
              isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                  isDarkTheme
                    ? "bg-gray-700 text-white focus:ring-yellow-500"
                    : "bg-gray-200 text-gray-800 focus:ring-blue-500"
                }`}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
