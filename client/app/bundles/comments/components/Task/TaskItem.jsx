import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';

export default class extends BaseComponent {
  render() {
    const { $$task } = this.props;

    return(
      <li>
        {$$task.get('title')}
      </li>
    )
  }
};
