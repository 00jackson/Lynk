'use client';

import { useState } from 'react';
import { marked } from 'marked';

type HelpRequest = {
  id: string;
  message: string;
  status: 'pending' | 'completed';
  createdAt: string;
  aiSuggestion?: string;
};

export default function HelpPage() {
  const [message, setMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [viewingRequestId, setViewingRequestId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiSuggestion(null);

    try {
      // Submit help request
      const response = await fetch('http://localhost:4001/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, userId: 'clrk_abc123' }),
      });
      const newRequest = await response.json();

      // Get AI suggestion
      setIsAiThinking(true);
      const res = await fetch('http://localhost:4001/api/help/ai-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setIsAiThinking(false);

      const requestWithSuggestion = {
        ...newRequest,
        status: 'pending',
        aiSuggestion: data.suggestion || 'No AI suggestion available'
      };

      setRequests(prev => [requestWithSuggestion, ...prev]);
      setAiSuggestion(data.suggestion || null);
    } catch (err) {
      setIsAiThinking(false);
      setAiSuggestion('Failed to get AI suggestion. Please try again.');
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const currentRequest = viewingRequestId 
    ? requests.find(req => req.id === viewingRequestId)
    : null;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Current conversation view */}
        {currentRequest ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <button 
                onClick={() => setViewingRequestId(null)}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to all requests
              </button>
              <span className={`px-2 py-1 text-xs rounded-full ${
                currentRequest.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {currentRequest.status}
              </span>
            </div>

            <div className="p-4">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your request</h3>
                <p className="text-gray-800">{currentRequest.message}</p>
              </div>

              {currentRequest.aiSuggestion && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">AI Assistant response</h3>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: marked.parse(currentRequest.aiSuggestion) }}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* New request form */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How can we help? 🤖</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                    isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Getting help...' : 'Get Help'}
                </button>
              </form>

              {isAiThinking && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-blue-600">
                  <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>AI is thinking...</span>
                </div>
              )}

              {aiSuggestion && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">AI Assistant</h3>
                  <div 
                    className="prose prose-sm max-w-none text-blue-900"
                    dangerouslySetInnerHTML={{ __html: marked.parse(aiSuggestion) }}
                  />
                </div>
              )}
            </div>

            {/* Previous requests */}
            {requests.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Previous requests</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {requests.map(request => (
                    <li key={request.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                      <button 
                        onClick={() => setViewingRequestId(request.id)}
                        className="w-full text-left"
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-gray-800 line-clamp-2">
                            {request.message}
                          </p>
                          <span className={`ml-2 flex-shrink-0 px-2 py-1 text-xs rounded-full ${
                            request.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        {request.aiSuggestion && (
                          <p className="mt-2 text-sm text-gray-500 line-clamp-1">
                            <span className="text-blue-600">AI:</span> {request.aiSuggestion.replace(/(\*\*|\*|`)/g, '').substring(0, 100)}...
                          </p>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}