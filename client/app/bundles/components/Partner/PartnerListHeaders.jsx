import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './PartnerListHeaders.scss';

export default class PartnerListHeaders extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'getClassName', 'handleSortClick');
  }

  static propTypes = {
    selectedSortType: PropTypes.string.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    sortPartners: PropTypes.func.isRequired
  };

  render() {
    const headerAttrs = [
      {
        sortType: 'name',
        label: 'Name',
        className: css.nameHeader
      },
      {
        sortType: 'relationship_status',
        label: 'Relationship Status',
        className: css.relationshipStatusHeader
      },
      {
        sortType: 'note',
        label: 'Note',
        className: css.noteHeader
      }
    ];

    return(
      <li className={css.partnerListHeaders}>
        {headerAttrs.map((header, idx) => {
          return (
            <div className={header.className}
                 key={idx}>
              <span onClick={this.handleSortClick.bind(this, header.sortType)}
                    className={this.getClassName(header.sortType)}>
                {header.label}
              </span>
            </div>
          )
        })}
      </li>
    )
  }

  getClassName(sortType) {
    const { selectedSortType } = this.props;
    const descSortType = sortType + ' desc';

    if(selectedSortType === sortType) {
      return css.sortArrowDesc;
    } else if(selectedSortType === descSortType) {
      return css.sortArrowAsc;
    }

    return "";
  }

  handleSortClick(sortType) {
    const { selectedSortType } = this.props;
    const descSortType = sortType + ' desc';

    let newSortType;
    if(sortType === selectedSortType) {
      newSortType = descSortType;
    } else {
      newSortType = sortType;
    }

    this.props.sortPartners(newSortType);
  }
};
