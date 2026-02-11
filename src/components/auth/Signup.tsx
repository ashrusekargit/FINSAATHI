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

    const validateEmail = (email: string) => {
        return email.endsWith('@gmail.com');
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            // Mock API call - Replace with actual backend endpoint
            const response = await fetch('https://finsaathi-backend.onrender.com/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, mobile, monthly_income: monthlyIncome }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">

            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                    <div>
                        <Link to="/" className="flex items-center text-gray-500 hover:text-brand-blue mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Home
                        </Link>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                            Create Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            Join FinSaathi for financial freedom
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div className="relative">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                        placeholder="you@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CheckCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                                <div className="relative">
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        required
                                        className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                        placeholder="Enter your mobile number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Income (₹)</label>
                                <div className="relative">
                                    <input
                                        id="monthly-income"
                                        name="monthlyOfIncome"
                                        type="number"
                                        required
                                        className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
                                        placeholder="Enter your monthly income"
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg animate-in fade-in border border-red-100 dark:border-red-900/20">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center text-green-600 text-sm bg-green-50 dark:bg-green-900/10 p-3 rounded-lg animate-in fade-in border border-green-100 dark:border-green-900/20">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {success}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <UserPlus className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                                </span>
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>

                        <div className="text-center text-sm">
                            <p className="text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-brand-blue hover:text-blue-500">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Signup;
