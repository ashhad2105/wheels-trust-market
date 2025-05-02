
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  read: boolean;
}

interface ChatSystemProps {
  receiverName?: string;
  minimized?: boolean;
  onMinimize?: () => void;
}

const ChatSystem: React.FC<ChatSystemProps> = ({
  receiverName = "Support",
  minimized = false,
  onMinimize
}) => {
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: true
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "user",
      timestamp: new Date(),
      read: true
    };
    
    setMessages([...messages, newUserMessage]);
    setCurrentMessage("");
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. Our team will get back to you shortly.",
        sender: "agent",
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prevMessages => [...prevMessages, agentResponse]);
    }, 1000);
  };
  
  const toggleChat = () => {
    setIsVisible(!isVisible);
    if (onMinimize) onMinimize();
  };
  
  if (minimized) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed right-4 bottom-4 rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary-dark flex items-center justify-center"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed right-4 bottom-4 z-50 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${isVisible ? 'h-96' : 'h-12'}`}>
      {/* Chat header */}
      <div 
        className="bg-primary text-white p-3 flex justify-between items-center cursor-pointer"
        onClick={toggleChat}
      >
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <div className="bg-primary-foreground rounded-full flex items-center justify-center h-full">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
          </Avatar>
          <span className="font-medium">{receiverName}</span>
        </div>
        <button className="text-white hover:text-gray-200">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isVisible ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            )}
          </svg>
        </button>
      </div>
      
      {isVisible && (
        <>
          {/* Messages area */}
          <ScrollArea className="h-72 p-3 bg-gray-50">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-2 ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <div className="p-3 border-t border-gray-200">
            <form 
              className="flex gap-2" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="sm" className="px-2">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSystem;
