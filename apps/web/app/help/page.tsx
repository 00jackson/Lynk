'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpPage() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [userRequests, setUserRequests] = useState<any[]>([]);
  const [coachRequests, setCoachRequests] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');

  const userId = 'clrk_xyz123'; // Replace with real session/user id
  const coachId = 'clrk_coach123'; // Replace with real session/coach id

  useEffect(() => {
    const fetchRequests = async () => {
      const userRes = await fetch(`http://localhost:4001/api/help?userId=${userId}`);
      const coachRes = await fetch(`http://localhost:4001/api/help?coachId=${coachId}`);

      if (userRes.ok) setUserRequests(await userRes.json());
      if (coachRes.ok) setCoachRequests(await coachRes.json());
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const res = await fetch('http://localhost:4001/api/help', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message }),
    });

    if (res.ok) {
      setMessage('');
      setStatus('success');
      // Refresh requests after submission
      const userRes = await fetch(`http://localhost:4001/api/help?userId=${userId}`);
      if (userRes.ok) setUserRequests(await userRes.json());
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Need Help?</h1>
          <p className="mt-1 opacity-90">Ask a coach anything. Live or async — we've got your back.</p>
        </div>

        {/* Help Request Form */}
        <div className="p-6 border-b border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="help-message" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your issue
              </label>
              <textarea
                id="help-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="What do you need help with today?"
                required
              />
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-all ${
                  status === 'submitting' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } shadow-sm flex items-center`}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Request Help'
                )}
              </motion.button>
            </div>
          </form>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-start"
              >
                <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Help request submitted! A coach will respond soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start"
              >
                <svg className="h-5 w-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Failed to submit request. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Requests Sections */}
        <div className="divide-y divide-gray-100">
          {/* User Requests Section */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Help Requests</h2>
              <div className="flex items-center">
                <label htmlFor="filter" className="mr-2 text-sm text-gray-600">Filter:</label>
                <select
                  id="filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'resolved')}
                  className="border border-gray-200 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <ul className="space-y-3">
              {userRequests
                .filter((req) => filterStatus === 'all' ? true : req.status === filterStatus)
                .map((req) => (
                  <motion.li 
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-gray-800">{req.message}</p>
                    <div className="mt-2 flex items-center text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {req.status}
                      </span>
                      <span className="ml-2 text-gray-500">
                        {new Date(req.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </motion.li>
                ))}
              {userRequests.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No help requests found
                </div>
              )}
            </ul>
          </div>

          {/* Coach Requests Section */}
          {coachRequests.length > 0 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Coaching Assignments</h2>
              <ul className="space-y-3">
                {coachRequests.map((req) => (
                  <motion.li 
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
                  >
                    <p className="text-gray-800">{req.message}</p>
                    <div className="mt-2 flex items-center text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {req.status}
                      </span>
                      <span className="ml-2 text-gray-500">
                        {new Date(req.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}