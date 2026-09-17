export function scrollToId(id) {
  const target = document.querySelector(id)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
