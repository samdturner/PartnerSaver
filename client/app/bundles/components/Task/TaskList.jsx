import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskList.scss';
import TaskItem from './TaskItem';
import TaskListHeaders from './TaskListHeaders';

export default class TaskList extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    _.bindAll(this, 'getTasks', 'getTaskListCss');
  }

  static propTypes = {
    $$tasksStore: ImmutablePropTypes.map.isRequired,
    $$partners: ImmutablePropTypes.list.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    sortTasks: PropTypes.func.isRequired,
    $$selectedTask: ImmutablePropTypes.map,
    selectTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    putTask: PropTypes.func.isRequired
  };

  render() {
    const { $$tasksStore, location, sortTasks } = this.props;
    const selectedSortType = $$tasksStore.get('selectedSortType');

    return (
      <div>
        <ul className={this.getTaskListCss()}>
          <TaskListHeaders selectedSortType={selectedSortType}
                          location={location}
                          sortTasks={sortTasks}
          />
          {this.getTasks()}
        </ul>
      </div>
    )
  }

  getTasks() {
    const $$tasks = this.props.$$tasksStore.get('$$tasks');
    const { $$selectedTask, selectTask, $$partners } = this.props;

    return(
      $$tasks.map($$task => {
        if($$task.get('isIncluded')) {
          let $$partner = $$partners.find(function($$partner) {
            return $$partner.get('id') === $$task.get('partner_id');
          })
          return(
            <TaskItem $$task={$$task}
                      $$partner={$$partner}
                      $$selectedTask={$$selectedTask}
                      selectTask={selectTask}
                      key={"taskItem" + $$task.get('id')}
                      updateTask={this.props.updateTask}
                      putTask={this.props.putTask}
            />
          )
        }
      })
    )
  }

  getTaskListCss() {
    const { $$selectedTask } = this.props;

    return $$selectedTask ? css.taskListCompact : css.taskListExpanded;
  }
};
