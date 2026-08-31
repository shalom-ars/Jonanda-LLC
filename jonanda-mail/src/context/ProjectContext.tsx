import React, { createContext, useContext, useState, useEffect } from 'react';
import { EcosystemProject } from '../types';
import { StorageService } from '../services/storageService';

interface ProjectContextType {
  projects: EcosystemProject[];
  currentProjectId: string; // 'all' or project ID
  currentProject: EcosystemProject | null;
  setCurrentProjectId: (id: string) => void;
  refreshProjects: () => void;
  getProjectById: (id: string) => EcosystemProject | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<EcosystemProject[]>(() => StorageService.getProjects());
  const [currentProjectId, setCurrentProjectId] = useState<string>('all');

  const refreshProjects = () => {
    setProjects(StorageService.getProjects());
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const currentProject = currentProjectId === 'all' 
    ? null 
    : projects.find(p => p.id === currentProjectId) || null;

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProjectId,
        currentProject,
        setCurrentProjectId,
        refreshProjects,
        getProjectById
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within a ProjectProvider');
  return ctx;
};
