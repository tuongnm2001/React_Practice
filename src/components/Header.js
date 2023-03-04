import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ImTumblr2 } from 'react-icons/im';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Header = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
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
                        <Nav className="me-auto">

                            <NavLink className='nav-link' to='/'>Home</NavLink>
                            <NavLink className='nav-link' to='/users'>Manage Users</NavLink>

                        </Nav>

                        <Nav>
                            <NavDropdown title="Setting" id="collasible-nav-dropdown">
                                <NavLink className='dropdown-item' to='/login'>Login</NavLink>
                                <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;