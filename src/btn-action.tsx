import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './btn-action.module.css'

interface BtnActionProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string
  linkTo?: string
  onClick?: React.MouseEventHandler
}

export default ({
  children,
  className,
  containerClassName,
  linkTo,
  onClick,
}: BtnActionProps) => {
  const classes = cn(styles.btnAction, className)

  let content: React.ReactNode

  if (linkTo) {
    content = (
      <Link to={linkTo} className={classes}>
        {children}
      </Link>
    )
  } else if (onClick) {
    content = (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    )
  } else {
    content = <button className={classes}>{children}</button>
  }

  return <div className={containerClassName}>{content}</div>
}
