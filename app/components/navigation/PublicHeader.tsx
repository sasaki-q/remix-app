import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';
import { Logo } from '../util/Logo';

export const PublicHeader = () => {
    const userId = useLoaderData()
    
    return (
        <header id="main-header">
        <Logo />
        <nav id="main-nav">
            <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/pricing">Pricing</NavLink>
            </li>
            </ul>
        </nav>
        <nav id="cta-nav">
            <ul>
            <li>
                {userId 
                ? (
                    <Form id="logout" action="/logout" method="post">
                        <button className='cta'>
                            Logout
                        </button>
                    </Form>
                ) 
                :(
                    <Link to="/auth" className="cta">
                        Login
                    </Link>
                )}
            </li>
            </ul>
        </nav>
        </header>
    );
}
