'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-500">Tech Stack: {project.techStack.join(', ')}</p>
            {project.link && (
              <a href={project.link} className="text-blue-600 underline text-sm mt-1 inline-block">
                View Project
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}