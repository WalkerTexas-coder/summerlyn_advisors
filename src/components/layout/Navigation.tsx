import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

interface NavigationProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function Navigation({ mobile = false, onLinkClick }: NavigationProps) {
  const baseStyles = mobile
    ? 'block py-2 text-gray-700 hover:text-primary-500'
    : 'px-4 py-2 text-gray-700 hover:text-primary-500';

  const activeStyles = 'text-primary-500 font-semibold';

  return (
    <nav>
      <ul className={mobile ? 'space-y-2' : 'flex space-x-1'}>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `${baseStyles} ${isActive ? activeStyles : ''} transition-colors`
              }
              onClick={onLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
