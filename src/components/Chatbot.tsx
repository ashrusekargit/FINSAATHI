import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

interface ChatbotProps {
    isOpen?: boolean;
    onToggle?: () => void;
    position?: 'left' | 'right';
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen: externalIsOpen, onToggle, position = 'right' }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Use external control if provided, otherwise internal
    const isControlled = externalIsOpen !== undefined;
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setInternalIsOpen(!internalIsOpen);
        }
    };
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm FinSaathi AI. How can I help you with your finances today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('https://finsaathi-backend.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await response.json();
            const botMessage: Message = {
                id: Date.now() + 1,
                text: data.reply || "I'm having trouble connecting right now.",
                sender: 'bot',
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm offline. Please check your connection.",
                sender: 'bot'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const chatRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen &&
                chatRef.current && !chatRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                handleToggle();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Toggle Button */}
            <button
                ref={buttonRef}
                onClick={handleToggle}
                className={`fixed bottom-6 ${position === 'left' ? 'left-6' : 'right-6'} z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-blue hover:bg-blue-700 hover:scale-110'
                    } text-white`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className={`fixed bottom-24 ${position === 'left' ? 'left-6' : 'right-6'} z-50 w-80 md:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col animate-in slide-in-from-bottom-5`}
                >
                    {/* Header */}
                    <div className="bg-brand-blue text-white p-4 rounded-t-2xl flex items-center space-x-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">FinSaathi AI</h3>
                            <p className="text-xs text-blue-100 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                Online
                            </p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-brand-blue text-white rounded-br-none'
                                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your question..."
                                className="flex-grow p-2 bg-gray-100 dark:bg-slate-800 border border-transparent focus:border-brand-blue rounded-full focus:outline-none dark:text-white text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className="p-2 bg-brand-blue text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
