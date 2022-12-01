import { Link, NavLink } from '@remix-run/react';
import { Logo } from '../util/Logo';

export const MainHeader = () => {
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses">Manage Expenses</NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            <Link to="/auth" className="cta">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
