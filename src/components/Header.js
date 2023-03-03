import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ImTumblr2 } from 'react-icons/im';
import { useLocation, NavLink } from 'react-router-dom'

const Header = () => {

    let location = useLocation()

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <ImTumblr2 className='logo' /><span className='text-logo'>UONG NM</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavLink className='nav-link' to='/'>Home</NavLink>
                            <NavLink className='nav-link' to='/users'>Manage Users</NavLink>

                        </Nav>

                        <Nav>
                            <NavDropdown title="Setting" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;