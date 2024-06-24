import NavItem from "../fragments/NavItem";

const NavItems = () => (
  <ul className="nav-items">
    <NavItem href="/about" text="About" />
    <NavItem href="/features" text="Features" />
    <NavItem href="/events" text="Events" />
    <NavItem href="/blog" text="Blog" />
    <NavItem href="/contact" text="Contact" />
  </ul>
);

export default NavItems;
