import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import './Layout.scss';

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <section>
        {this.props.children}
      </section>
    );
  }
}
