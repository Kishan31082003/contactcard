
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { ToastContainer, toast } from 'react-toastify';





export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
        //alert("LOGGED OUT SUCCESSFULLY!");
        toast.success("LOGGED OUT SUCCESSFULLY!")
    }
    return (
        <div className='navbar'>
            <div className='logo'>E-callbooks</div>
            <div className='links'>
                <Link className={`link ${location.pathname==='/myteam'? "active": ""}`}   to={localStorage.getItem('token') ? '/myteam' : "/login"}>My Team</Link>
                <Link className={`link ${location.pathname==='/allusers'? "active": ""}`}   to={localStorage.getItem('token') ? '/allusers' : "/login"}>All users</Link>
                {localStorage.getItem('role')==='admin' && <Link className={`link ${location.pathname==='/admin'? "active": ""}`}   to='/admin'>Admin mode</Link>}
                <Link className={`link ${location.pathname==='/'? "active": ""}`}   to='/'>Contacts</Link>
                <Link className={`link ${location.pathname==='/about'?  "active": ""}`}  to='/about'>About</Link>
            </div>
            <div>
                  
                {!localStorage.getItem('token') ? (<>
                    <Link className={`link ${location.pathname === '/login' ? "active" : ""}`} to='/login'>Login</Link>
                    <Link className={`link ${location.pathname === '/signup' ? "active" : ""}`} to='/signup'>Signup</Link>
                </>)
                    :
                    (<h5 className="nav_logout" onClick={handleLogout}>Logout</h5>)}
                   
            </div>
        </div>
    );
}