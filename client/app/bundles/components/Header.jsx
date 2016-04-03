import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import css from './Header.scss';

export default class Header extends React.Component {
  render() {
    return(
      <Navbar className={css.navbar}>
        <Navbar.Header>
          <LinkContainer to={{ pathname: '/tasks' }}>
            <Navbar.Brand>
              PartnerSaver
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{ pathname: '/tasks' }}>
              <NavItem eventKey={1}>
                Deliverables & Rewards
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to={{ pathname: '/partners' }}>
              <NavItem eventKey={2}>
                Partners
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};
