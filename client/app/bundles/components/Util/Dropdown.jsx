import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent';
import css from './Dropdown.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    return(
      <div className={css.selectContainer}>
        {this.props.options.map(option => {
          return(
            <div className={css.selectOption}
                  onClick={this.props.onSelect.bind(this, option.value)}>
              {this.getCheckMark(option.selected)}
              <span className={option.selected ? css.selectedLabel : css.selectLabel}>
                {option.label}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  getCheckMark(selected) {
    if(!selected) {
      return null;
    }

    return <Icon name="check" className={css.check} />;
  }
};
