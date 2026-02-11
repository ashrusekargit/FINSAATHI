import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
const Chatbot = ({ isOpen: externalIsOpen, onToggle, position = 'right' }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    // Use external control if provided, otherwise internal
    const isControlled = externalIsOpen !== undefined;
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;
    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        }
        else {
            setInternalIsOpen(!internalIsOpen);
        }
    };
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm FinSaathi AI. How can I help you with your finances today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);
    const handleSendMessage = async () => {
        if (!inputValue.trim())
            return;
        const userMessage = {
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
            const botMessage = {
                id: Date.now() + 1,
                text: data.reply || "I'm having trouble connecting right now.",
                sender: 'bot',
            };
            setMessages((prev) => [...prev, botMessage]);
        }
        catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [...prev, {
                    id: Date.now() + 1,
                    text: "Sorry, I'm offline. Please check your connection.",
                    sender: 'bot'
                }]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    const chatRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                chatRef.current && !chatRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                handleToggle();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (_jsxs(_Fragment, { children: [_jsx("button", { ref: buttonRef, onClick: handleToggle, className: `fixed bottom-6 ${position === 'left' ? 'left-6' : 'right-6'} z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-blue hover:bg-blue-700 hover:scale-110'} text-white`, children: isOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(MessageSquare, { className: "w-6 h-6" }) }), isOpen && (_jsxs("div", { ref: chatRef, className: `fixed bottom-24 ${position === 'left' ? 'left-6' : 'right-6'} z-50 w-80 md:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col animate-in slide-in-from-bottom-5`, children: [_jsxs("div", { className: "bg-brand-blue text-white p-4 rounded-t-2xl flex items-center space-x-3", children: [_jsx("div", { className: "bg-white/20 p-2 rounded-full", children: _jsx(Bot, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", children: "FinSaathi AI" }), _jsxs("p", { className: "text-xs text-blue-100 flex items-center", children: [_jsx("span", { className: "w-2 h-2 bg-green-400 rounded-full mr-1" }), "Online"] })] })] }), _jsxs("div", { className: "flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50", children: [messages.map((msg) => (_jsx("div", { className: `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsx("div", { className: `max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-brand-blue text-white rounded-br-none'
                                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'}`, children: msg.text }) }, msg.id))), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" })] }) }) })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: handleKeyPress, placeholder: "Type your question...", className: "flex-grow p-2 bg-gray-100 dark:bg-slate-800 border border-transparent focus:border-brand-blue rounded-full focus:outline-none dark:text-white text-sm" }), _jsx("button", { onClick: handleSendMessage, disabled: !inputValue.trim() || isLoading, className: "p-2 bg-brand-blue text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: _jsx(Send, { className: "w-5 h-5" }) })] }) })] }))] }));
};
export default Chatbot;
