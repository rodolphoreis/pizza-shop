import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;
const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      data-active={pathname === props.to}
      {...props}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
    />
  );
};

export default NavLink;
