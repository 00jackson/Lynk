// apps/web/hooks/useProjects.ts

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4001/api/project';

type Project = {
    id: string;
    userId: string;
    title: string;
    description: string;
    techStack: string[];
    link?: string;
    createdAt: string;
    updatedAt: string;
  };
  
const [projects, setProjects] = useState<Project[]>([]);

export const useProjects = (userId: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${userId}`);
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (payload: any) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create project');
    const newProject = await res.json();
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = async (id: string, payload: any) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update project');
    const updated = await res.json();
    setProjects((prev) => prev.map((p: Project) => (p.id === id ? updated : p)));
  };

  const deleteProject = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setProjects((prev) => prev.filter((p: Project) => p.id !== id));
  };

  useEffect(() => {
    if (userId) fetchProjects();
  }, [userId]);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };
};