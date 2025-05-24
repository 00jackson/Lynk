'use client';

import { useState } from 'react';
import { useEffect } from 'react';

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
    } else {
      setStatus('error');
    }
  };

  

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-20 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Need Help?</h1>
      <p className="mb-8 text-gray-600">Ask a coach anything. Live or async — we’ve got your back.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Describe your issue or request..."
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Request Help'}
        </button>
      </form>

      {status === 'success' && <p className="mt-4 text-green-600">✅ Help request submitted!</p>}
      {status === 'error' && <p className="mt-4 text-red-600">❌ Failed to submit request.</p>}

      <div className="mt-8">
        <label htmlFor="filter" className="mr-2 font-medium text-gray-700">Filter:</label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'resolved')}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Help Requests</h2>
        <ul className="space-y-4">
          {userRequests
            .filter((req) =>
              filterStatus === 'all' ? true : req.status === filterStatus
            )
            .map((req) => (
              <li key={req.id} className="p-4 bg-gray-50 border rounded-md">
                <p className="text-gray-800">{req.message}</p>
                <p className="text-sm text-gray-500">Status: {req.status}</p>
              </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-green-600 mb-4">Coaching Assignments</h2>
        <ul className="space-y-4">
          {coachRequests.map((req) => (
            <li key={req.id} className="p-4 bg-white border rounded-md">
              <p className="text-gray-800">{req.message}</p>
              <p className="text-sm text-gray-500">Status: {req.status}</p>
              <p className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}