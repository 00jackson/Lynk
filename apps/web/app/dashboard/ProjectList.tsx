'use client';

import { useEffect, useState, FormEvent } from 'react';

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
};

export default function ProjectList({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [link, setLink] = useState('');
  const [showForm, setShowForm] = useState(false);

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

      // Clear form and refresh projects
      setTitle('');
      setDescription('');
      setTechStack('');
      setLink('');
      fetchProjects();
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-500">Create New Project</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          type="button"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition"
        >
          {showForm ? '–' : '+'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded bg-white shadow-md hover:shadow-lg transition mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Tech Stack (comma-separated)"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Project Link (optional)"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Project
          </button>
        </form>
      )}

      <div className="mt-10">
        {projects.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="p-6 rounded-lg shadow-md hover:shadow-lg transition bg-white">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">{project.title}</h3>
                  <hr className="my-2" />
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p className="text-sm text-gray-500">
                    Tech Stack: {project.techStack.join(', ')}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-blue-600 underline text-sm mt-1 inline-block"
                    >
                      View Project
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="mt-4 text-red-600 text-sm font-medium hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-sm text-gray-500">No projects found. Start by creating one above.</p>
        )}
      </div>
    </div>
  );
}