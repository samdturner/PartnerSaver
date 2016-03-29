import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import Header from '../components/Header';

import './Layout.scss';

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <section>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}
