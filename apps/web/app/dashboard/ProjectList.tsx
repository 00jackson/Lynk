'use client';

import { useEffect, useState, FormEvent } from 'react';
import {
  IoFolderOpenOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoBulbOutline,
  IoConstructOutline,
  IoLinkOutline,
  IoNewspaperSharp,
  IoCloseOutline,
  IoPricetagOutline,
  IoCashOutline,
  IoEyeOutline,
  IoRepeatOutline,
  IoMailUnreadOutline,
} from 'react-icons/io5';
import { IoIosCode } from "react-icons/io";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  folder?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  baseRate?: string;
  minBudget?: string;
  maxBudget?: string;
  showToEditors?: boolean;
  showToClient?: boolean;
  autoReset?: boolean;
  emailAlerts?: boolean;
};

export default function ProjectList({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [link, setLink] = useState('');
  const [folder, setFolder] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [baseRate, setBaseRate] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [showToEditors, setShowToEditors] = useState(false);
  const [showToClient, setShowToClient] = useState(false);
  const [autoReset, setAutoReset] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentStep] = useState(1);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`http://localhost:4001/api/project?userId=${userId}`);
      if (!res.ok) {
        console.error('Failed to fetch projects:', res.statusText);
        return;
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newProject = {
      userId,
      title,
      description,
      techStack: techStack.split(',').map((s) => s.trim()),
      link,
      folder,
      startDate,
      endDate,
      notes,
      baseRate,
      minBudget,
      maxBudget,
      showToEditors,
      showToClient,
      autoReset,
      emailAlerts,
    };

    try {
      const res = await fetch('http://localhost:4001/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        console.error('Failed to create project:', await res.text());
        return;
      }

      // Reset form and fetch projects
      setTitle('');
      setDescription('');
      setTechStack('');
      setLink('');
      setFolder('');
      setStartDate('');
      setEndDate('');
      setNotes('');
      setBaseRate('');
      setMinBudget('');
      setMaxBudget('');
      setShowToEditors(false);
      setShowToClient(false);
      setAutoReset(false);
      setEmailAlerts(false);
      fetchProjects();
      setShowForm(false);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4001/api/project/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        console.error('Failed to delete project:', await res.text());
        return;
      }

      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Project List */}
        <div className="col-span-9">
          <div className="flex items-center mb-6 relative">
            <h2
              className="text-2xl font-bold tracking-tight text-gray-800 pl-5 relative before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-2 before:h-2 before:bg-blue-600 before:rounded-full"
            >
              Your Projects
            </h2>
          </div>
          <div className="mt-4">
            {projects.length > 0 ? (
              <ul className="space-y-6">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="p-6 rounded-lg border border-gray-200 hover:border-blue-400 transition-shadow shadow-sm hover:shadow-lg ring-1 ring-inset ring-gray-100 bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl font-bold text-blue-500">{project.title}</h3>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="ml-2 px-3 py-1 border border-red-200 rounded text-red-600 text-sm font-medium hover:text-white hover:bg-red-600 hover:border-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                    <hr className="my-2" />
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-gray-700">
                        <IoBulbOutline className="text-blue-400 mt-1" />
                        <span className="font-medium text-gray-600">{project.description}</span>
                      </div>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoIosCode className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-600">{project.techStack.join(', ')}</span>
                        </div>
                      )}
                      {project.folder && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoFolderOpenOutline className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-600">{project.folder}</span>
                        </div>
                      )}
                      {(project.startDate || project.endDate) && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoCalendarOutline className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-600">{project.startDate ?? '—'} to {project.endDate ?? '—'}</span>
                        </div>
                      )}
                      {project.notes && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoDocumentTextOutline className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-600">{project.notes}</span>
                        </div>
                      )}
                      {(project.baseRate || project.minBudget || project.maxBudget) && (
                        <div className="flex items-start gap-2 text-gray-700">
                          {project.baseRate && (
                            <span className="flex items-start gap-2">
                              <IoPricetagOutline className="text-blue-400 mt-1" />
                              <span className="font-medium text-gray-600">${project.baseRate}</span>
                            </span>
                          )}
                          {project.minBudget && (
                            <span className="flex items-start gap-2">
                              <IoCashOutline className="text-blue-400 mt-1" />
                              <span className="font-medium text-gray-600">${project.minBudget}</span>
                            </span>
                          )}
                          {project.maxBudget && (
                            <span className="flex items-start gap-2">
                              <IoCashOutline className="text-blue-400 mt-1" />
                              <span className="font-medium text-gray-600">${project.maxBudget}</span>
                            </span>
                          )}
                        </div>
                      )}
                      {(project.showToEditors !== undefined || project.showToClient !== undefined) && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoEyeOutline className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-600">
                            {project.showToEditors && 'Editors '}
                            {project.showToClient && 'Client '}
                            {(!project.showToEditors && !project.showToClient) && 'None'}
                          </span>
                        </div>
                      )}
                      {project.autoReset !== undefined && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoRepeatOutline className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-700">{project.autoReset ? 'Auto-reset enabled' : 'Auto-reset disabled'}</span>
                        </div>
                      )}
                      {project.emailAlerts !== undefined && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <IoMailUnreadOutline className="text-blue-400 mt-1" />
                          <span className="font-medium text-gray-700">{project.emailAlerts ? 'Email alerts enabled' : 'Email alerts disabled'}</span>
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          className="flex items-center gap-1 text-blue-600 underline text-sm mt-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLinkOutline className="text-blue-400" />
                          View Project
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No projects found. Start by creating one above.</p>
            )}
          </div>
        </div>
        {/* Sidebar/Form trigger */}
        <div className="col-span-3 flex flex-col items-end pt-2">
          <div className="flex items-center justify-between w-full mb-4">
            <span className='ml-3 text-sm font-semibold'>Create New Project</span>
            <button
              onClick={() => setShowForm(!showForm)}
              type="button"
              className="w-10 h-10 flex items-center justify-center text-xl font-bold text-blue-600 hover:text-blue-800 rounded-full shadow-md hover:shadow-lg bg-white ring-1 ring-gray-200 transition"
              aria-label={showForm ? 'Close form' : 'Open form'}
            >
              {showForm ? '–' : '+'}
            </button>
          </div>
        </div>
      </div>
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-40 bg-blue-100/30 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg w-full max-w-5xl p-8 sm:p-10 relative max-h-screen sm:max-h-[85vh] overflow-y-auto ring-1 ring-gray-200">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-blue-600 hover:text-gray-900 text-xl"
            >
              <IoCloseOutline />
            </button>
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight text-gray-800 mb-4">Create a new project to get started</h3>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <IoNewspaperSharp className='text-gray-600 font-medium'/>
                  Project Name *
                  <span className="text-xs text-white" title="Enter a meaningful project title"></span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a catchy project title"
                  className="w-full text-gray-900 border border-gray-300 placeholder-blue-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <IoFolderOpenOutline className="text-gray-600" />
                  Select Folder *
                  <span className="text-xs text-white" title="Choose the folder or workspace"></span>
                </label>
                <select
                  className="w-full text-gray-900 border border-gray-300 placeholder-blue-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                >
                  <option value="" className="text-blue-600">-- Select Folder --</option>
                  <option value="frontend">Frontend Sprint</option>
                  <option value="backend">Backend Tasks</option>
                  <option value="ai">AI Prototypes</option>
                  <option value="devops">DevOps</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                    <IoCalendarOutline className="text-gray-600" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-blue-50 text-gray-900 border border-gray-300 placeholder-blue-600 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Choose date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                    <IoCalendarOutline className="text-gray-600" />
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-blue-50 text-gray-900 border border-gray-300 placeholder-blue-600 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Choose date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <IoDocumentTextOutline className="text-gray-600" />
                  Notes
                </label>
                <textarea
                  placeholder="Leave any notes here"
                  className="w-full text-gray-900 border border-gray-300 placeholder-blue-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <IoBulbOutline className="text-gray-600" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe what your project does"
                  className="w-full text-gray-900 border border-gray-300 placeholder-blue-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-blue-600 mt-1">Explain the goal or functionality of your project.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <IoConstructOutline className="text-gray-600" />
                  Tech Stack
                </label>
                <input
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="e.g., React, Node.js, PostgreSQL"
                  className="w-full text-gray-900 border border-gray-300 placeholder-blue-500 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-blue-600 mt-1">List technologies separated by commas.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                  <IoLinkOutline className="text-gray-600" />
                  Project Link (optional)
                </label> 
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://your-project-url.com"
                  className="w-full bg-blue-50 text-gray-900 border border-gray-300 placeholder-blue-600 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-blue-600 mt-1">Add a live demo or GitHub link if available.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Base Rate</label>
                  <input
                    placeholder="$ 0.00"
                    className="w-full bg-blue-50 text-gray-900 border border-gray-300 placeholder-blue-600 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={baseRate}
                    onChange={(e) => setBaseRate(e.target.value)}
                  />
                  <p className="text-xs text-blue-600 mt-1">Hourly rate</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Minimum Budget</label>
                  <input
                    placeholder="$ 0.00"
                    className="w-full bg-blue-50 text-gray-900 border border-gray-300 placeholder-blue-600 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Maximum Budget</label>
                  <input
                    placeholder="$ 0.00"
                    className="w-full bg-blue-50 text-gray-900 border border-gray-300 placeholder-blue-600 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={showToEditors}
                    onChange={(e) => setShowToEditors(e.target.checked)}
                  /> Show budget to editors
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={showToClient}
                    onChange={(e) => setShowToClient(e.target.checked)}
                  /> Show budget to client
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={autoReset}
                    onChange={(e) => setAutoReset(e.target.checked)}
                  /> Budget resets automatically
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                  /> Send budget email alerts
                </label>
              </div>
              <div className="flex items-center justify-between pt-6">
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Need help?</a>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition shadow-sm"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* End Modal Form */}
    </div>
  );
}