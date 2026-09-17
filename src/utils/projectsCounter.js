// The real project/quote count lives in MongoDB (see Stats.jsx, which fetches
// it from the API on mount). This just lets a form broadcast an optimistic
// "+1" the moment a submission succeeds, so the visible number updates
// instantly without waiting for a page reload.
export const PROJECTS_COUNT_EVENT = 'projects-count-updated'

export function notifyProjectsCountIncrement() {
  window.dispatchEvent(new CustomEvent(PROJECTS_COUNT_EVENT))
}
