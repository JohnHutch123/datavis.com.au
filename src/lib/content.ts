import { getCollection, type CollectionEntry } from 'astro:content';

// Drafts show in `npm run dev` so you can review them, and are left out of the build.
const live = (e: { data: { draft: boolean } }) => import.meta.env.DEV || !e.data.draft;
const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getGroups() {
  return (await getCollection('groups', live)).sort(byOrder);
}

export async function getProjects(groupId?: string) {
  const all = (await getCollection('projects', live)).sort(byOrder);
  return groupId ? all.filter((p) => p.data.group.id === groupId) : all;
}

export async function getDocs(projectId?: string) {
  const all = (await getCollection('docs', live)).sort(byOrder);
  return projectId ? all.filter((d) => d.data.project.id === projectId) : all;
}

export async function getApps(projectId?: string) {
  const all = (await getCollection('apps', live)).sort(byOrder);
  return projectId ? all.filter((a) => a.data.project?.id === projectId) : all;
}

export const statusLabel: Record<string, string> = {
  active: 'Active',
  wip: 'Work in progress',
  beta: 'Beta',
  maintenance: 'Maintenance',
  archived: 'Archived',
};

export const projectUrl = (p: CollectionEntry<'projects'>) => `/projects/${p.data.group.id}/${p.id}/`;
export const groupUrl = (id: string) => `/projects/${id}/`;
export const docUrl = (d: CollectionEntry<'docs'>) => `/docs/${d.id}/`;
export const appUrl = (id: string) => `/apps/${id}/`;
