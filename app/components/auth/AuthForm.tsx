import { Link, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

export const AuthForm = () => {
  const [ params ] = useSearchParams()
  const authMode = params.get("mode") || "login"

  const toggleContents = authMode === "login"
    ? {
      icon: FaLock,
      caption: [
        "Login",
        "Log in with existing user",
      ],
      path: "?mode=signup"
    }
    : {
      icon: FaUserPlus,
      caption: [
        "Sign up",
        "Create a mew user",
      ],
      path: "?mode=login"
    }

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {<toggleContents.icon/>}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button>{toggleContents.caption[0]}</button>
        <Link to={toggleContents.path}>{toggleContents.caption[1]}</Link>
      </div>
    </form>
  );
}
