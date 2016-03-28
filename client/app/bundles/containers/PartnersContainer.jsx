import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as tasksActionCreators from '../actions/tasksActionCreators';
import PartnerList from '../components/Partner/PartnerList';
import NewPartnerButton from '../components/Partner/NewPartnerButton';
import BaseComponent from 'libs/components/BaseComponent';

function mapStateToProps(state, ownProps) {
  return { $$partnersStore: state.$$partnersStore }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    taskActions: bindActionCreators(tasksActionCreators, dispatch)
  };
}

export default class PartnersContainer extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getTaskWindow'
    );
  }

  static propTypes = {
    $$partnersStore: ImmutablePropTypes.map.isRequired,
    partnerActions: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired
  };

  render() {
    const { $$partnersStore, location } = this.props;

    return (
      <div>
        <div className={`${css.tasksContainer} clearfix`}>
          <PartnerList $$partnersStore={$$partnersStore}
                        location={location}
                        $$selectedPartner={this.getSelectedTask()}
                        selectPartner={this.selectPartner}
                        updatePartner={this.updatePartner}
                        putPartner={this.putPartner}
          />
        </div>
      </div>
    );
  }

  // getTaskWindow() {
  //   const $$selectedPartner = this.getSelectedTask();
  //
  //   return(
  //     <TaskEditor $$selectedPartner={$$selectedPartner}
  //                 closeTaskWindow={this.closeTaskWindow}
  //                 updatePartner={this.updatePartner}
  //                 putPartner={this.putPartner}
  //                 deleteTask={this.deleteTask}
  //                 key="taskEditor"
  //     />
  //   )
  // }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnersContainer);
