import { Link } from 'react-router-dom';
import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-block font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center';

  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  // Internal link
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick as any} {...props}>
        {children}
      </Link>
    );
  }

  // External link
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick as any} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  // Button
  return (
    <button type={type} className={classes} onClick={onClick as any} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
