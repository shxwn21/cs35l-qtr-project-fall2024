import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
} from 'reactstrap';
import { UserContext } from "../context/user-context";
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';

const OptionsBar: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const resource: string = "http://localhost:8000/user/logout";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      const req: RequestInit = {
        headers: headers,
        method: "GET",
        credentials: "include",
        mode: "cors",
      };

      const response = await fetch(resource, req);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error during logout:', error);
    }

    navigate('/');
    navigate(0);
  };

  return (
    <div>
      <Navbar color="light" expand="md" container="fluid">
        <NavbarBrand onClick={() => navigate("/")}>Rumeez</NavbarBrand>
        <NavbarBrand onClick={() => navigate("/")}>
          <img
            alt="logo"
            src="rumeez.png"
            style={{
              height: 40,
              width: 40
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {context.user.isLoggedIn && (
              <>
                <NavItem className="d-md-block ml-md-auto" >
                  <NavLink onClick={() => navigate("/home")}>Home</NavLink>
                </NavItem>
                <NavItem className="d-md-block ml-md-auto">
                  <NavLink onClick={() => navigate("/preference")}>Preferences</NavLink>
                </NavItem>
                <NavItem className="d-md-block ml-md-auto">
                  <NavLink onClick={() => navigate("/chats")}>Chats</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => navigate("/search")}>Search</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    User
                  </DropdownToggle>
                  <DropdownMenu left="true">
                    <DropdownItem onClick={() => navigate("/passwordreset")}>Password reset</DropdownItem>
                    <DropdownItem onClick={() => navigate("/verify")}>Account verification</DropdownItem>
                    <DropdownItem onClick={() => navigate("/myprofile")}>View my profile</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink onClick={() => navigate("/user")}>User Information</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav>
            {!context.user.isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink onClick={() => navigate("/signup")}>Sign up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => setModal(!modal)}>Login</NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <Login setModal={setModal} />
        </Modal>
      </Navbar>
    </div>
  );
}

export default OptionsBar;
