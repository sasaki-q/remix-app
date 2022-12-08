import { 
  Link, 
  useSearchParams,
  useTransition as useNavigate 
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

export const AuthForm = () => {
  const [ params ] = useSearchParams()
  const navigate = useNavigate()
  
  const authMode = params.get("mode") || "login"
  const toggleContents = authMode === "login"
    ? {
      icon: FaLock,
      caption: [
        "Login",
        "Create a new user ?",
      ],
      path: "?mode=signup"
    }
    : {
      icon: FaUserPlus,
      caption: [
        "Sign up",
        "Log in with existing user ?",
      ],
      path: "?mode=login"
    }

  const isSubmitting = navigate.state !== "idle"

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
        <input type="password" id="password" name="password" minLength={7} required defaultValue={""}/>
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating ..." : toggleContents.caption[0]}
        </button>
        <Link to={toggleContents.path}>{toggleContents.caption[1]}</Link>
      </div>
    </form>
  );
}
