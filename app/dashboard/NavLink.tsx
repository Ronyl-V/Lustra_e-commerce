import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: ReactNode;
  activeClassName?: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  exact = false,
  children,
  activeClassName = "text-purple-700 font-semibold",
  className = "text-gray-600 hover:text-gray-900",
}) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = exact
    ? currentPath === href
    : currentPath.startsWith(href);

  const combinedClassName = isActive
    ? `${className} ${activeClassName}`
    : className;

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};

export default NavLink;
