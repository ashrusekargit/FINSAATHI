import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, CheckCircle, UserPlus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validateEmail = (email) => {
        return email.endsWith('@gmail.com');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!validateEmail(email)) {
            setError('Email must end with @gmail.com');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            // Mock Signup - Client side only for GitHub Pages
            console.log('Using Mock Signup');

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock success
            setSuccess('Account created successfully! Redirecting to login...');

            // Simulate backend storage by logging (optional)
            console.log('User registered:', { email, mobile, monthlyIncome });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        }
        catch (err) {
            console.error(err);
            setError('Failed to connect to server. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300", children: _jsx("div", { className: "flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-300", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/", className: "flex items-center text-gray-500 hover:text-brand-blue mb-6 transition-colors", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }), "Back to Home"] }), _jsx("h2", { className: "text-center text-3xl font-extrabold text-gray-900 dark:text-white", children: "Create Account" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600 dark:text-gray-400", children: "Join FinSaathi for financial freedom" })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { className: "rounded-md shadow-sm space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "email-address", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Mail, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "email-address", name: "email", type: "email", autoComplete: "email", required: true, className: "appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors", placeholder: "you@gmail.com", value: email, onChange: (e) => setEmail(e.target.value) })] })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Lock, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, className: "appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors", placeholder: "Create a password", value: password, onChange: (e) => setPassword(e.target.value) })] })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "confirm-password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(CheckCircle, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "confirm-password", name: "confirm-password", type: "password", autoComplete: "new-password", required: true, className: "appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors", placeholder: "Confirm your password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) })] })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "mobile", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Mobile Number" }), _jsx("div", { className: "relative", children: _jsx("input", { id: "mobile", name: "mobile", type: "tel", required: true, className: "appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors", placeholder: "Enter your mobile number", value: mobile, onChange: (e) => setMobile(e.target.value) }) })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "monthly-income", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Monthly Income (\u20B9)" }), _jsx("div", { className: "relative", children: _jsx("input", { id: "monthly-income", name: "monthlyOfIncome", type: "number", required: true, className: "appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors", placeholder: "Enter your monthly income", value: monthlyIncome, onChange: (e) => setMonthlyIncome(e.target.value) }) })] })] }), error && (_jsxs("div", { className: "flex items-center text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg animate-in fade-in border border-red-100 dark:border-red-900/20", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-2" }), error] })), success && (_jsxs("div", { className: "flex items-center text-green-600 text-sm bg-green-50 dark:bg-green-900/10 p-3 rounded-lg animate-in fade-in border border-green-100 dark:border-green-900/20", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), success] })), _jsx("div", { children: _jsxs("button", { type: "submit", disabled: loading, className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed", children: [_jsx("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3", children: _jsx(UserPlus, { className: "h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" }) }), loading ? 'Creating Account...' : 'Sign Up'] }) }), _jsx("div", { className: "text-center text-sm", children: _jsxs("p", { className: "text-gray-600 dark:text-gray-400", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-medium text-brand-blue hover:text-blue-500", children: "Sign in here" })] }) })] })] }) }) }));
};
export default Signup;
