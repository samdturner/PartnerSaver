import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import css from './Header.scss';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <Navbar className={css.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            PartnerSaver
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              Deliverables & Rewards
            </NavItem>
          </Nav>
          <Nav>
            <NavItem eventKey={2}>
              Partners
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};
