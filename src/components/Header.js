import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ImTumblr2 } from 'react-icons/im';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

const Header = () => {

    const { logout, user } = useContext(UserContext)
    const navigate = useNavigate()
    const [hideHeader, setHideHeader] = useState(false)

    // useEffect(() => {
    //     if (window.locationbar.pathname === '/login') {
    //         setHideHeader(true)
    //     }
    // }, [])

    const handleLogout = () => {
        logout();
        navigate('/login')
        toast.success('Logout Success!')
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>

                    <NavLink className='navbar-brand' to='/'>
                        <ImTumblr2 className='logo' /><span className='text-logo'>UONG NM</span>
                    </NavLink>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            (user && user.auth || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto">

                                    <NavLink className='nav-link' to='/'>Home</NavLink>
                                    <NavLink className='nav-link' to='/users'>Manage Users</NavLink>

                                </Nav>

                                <Nav>
                                    {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                    <NavDropdown title="Setting" id="collasible-nav-dropdown">
                                        {
                                            user && user.auth === true ?
                                                <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                                :
                                                <NavLink className='dropdown-item' to='/login'>Login</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;