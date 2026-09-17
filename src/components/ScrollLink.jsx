import { scrollToId } from '../utils/scroll'

export function ScrollLink({ href, className, children, onClick, ...rest }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(href)
        if (onClick) onClick()
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
