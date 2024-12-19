import type { LinkProps } from '@remix-run/react';
import { Link, useLocation } from '@remix-run/react';

export const LinkWithQuery = ({ children, to, ...props }: LinkProps) => {
  const { search } = useLocation();

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
};
