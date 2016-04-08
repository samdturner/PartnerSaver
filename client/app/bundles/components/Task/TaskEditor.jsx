import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskEditor.scss';
import '../Util/Datepicker.scss';
import Icon from 'react-fa'
import Dropdown from '../Util/Dropdown';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import StatusSelector from './StatusSelector';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getPartnerSelector',
      'handlePartnerSelect',
      'getDropdownOptions',
      'getDeadlineSelector',
      'getCategoryToggle',
      'showDatePicker',
      'getTaskTitleInput',
      'getTaskDescriptionInput',
      'handleUpdateDate',
      'handleUpdateText',
      'updateTask',
      'putTask',
      'handleDeleteTask'
    );
    this.putTask = _.debounce(this.putTask, 200);
  }

  static propTypes = {
    $$selectedTask: ImmutablePropTypes.map.isRequired,
    $$partners: ImmutablePropTypes.list.isRequired,
    closeTaskWindow: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    putTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
  };

  render() {
    const { $$selectedTask } = this.props;

    return this.getEditorContent();
  }

  getEditorContent() {
    return(
      <ReactCSSTransitionGroup
                        transitionName="new-item-wrapper"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
        {this.getEditor()}
      </ReactCSSTransitionGroup>
    )
  }

  getEditor() {
    if (!this.props.$$selectedTask) {
      return null;
    }

    return(
      <div className={css.newTaskWrapper}
           key="new-item-wrapper">
        <div key="new-task-container"
             className={css.newTaskContainer}>
          <div className={css.header}>
            <a className="close"
               onClick={this.props.closeTaskWindow}>&times;</a>
            {this.getPartnerSelector()}
            {this.getDeadlineSelector()}
          </div>
          <div className={`${css.secondHeader}` + " clearfix"}>
            {this.getCategoryToggle()}
            <a className={`${css.deleteTaskBtn}` + " btn-xs btn-danger btn"}
               onClick={this.handleDeleteTask}>
              Delete
            </a>
          </div>
          <div className={`${css.thirdHeader}` + " clearfix"}>
            <StatusSelector
                      $$task={this.props.$$selectedTask}
                      onSelect={this.updateTask}
            />
            {this.getTaskTitleInput()}
          </div>
          <div>
            {this.getTaskDescriptionInput()}
          </div>
          <a className={`${css.doneTaskBtn}` + " btn btn-success"}
             onClick={this.props.closeTaskWindow}>
            Done
          </a>
        </div>
      </div>
    )
  }

  getPartnerSelector() {
    const { $$partners, $$selectedTask } = this.props;
    let $$selectedPartner = $$partners.find(function($$partner) {
      return $$partner.get('id') === $$selectedTask.get('partner_id');
    });

    let partnerName = "+ Add a partner";
    if($$selectedPartner) {
      partnerName = $$selectedPartner.get('name');
    }

    return(
      <div className={css.partnerSelectorContainer}>
        <div className={css.iconContainer}>
          <Icon name="briefcase" className={css.icon} />
        </div>
        <div className={css.iconLabelContainer}>
          <span className={css.iconLabel}>{partnerName}</span>
        </div>
        <Dropdown
              options={this.getDropdownOptions()}
              onSelect={this.handlePartnerSelect}
        />
      </div>
    )
  }

  getDeadlineSelector() {
    const deadline = this.props.$$selectedTask.get('deadline');
    const dateObj = moment(deadline, "YYYY-MM-DD");

    return(
      <div className={css.deadlineSelectorContainer}
            onClick={this.showDatePicker}>
        <div className={css.iconContainer}>
          <Icon name="calendar" className={css.icon} />
        </div>
        <span className={css.iconLabel}>
          <DatePicker
              dateFormat="MM/DD/YYYY"
              selected={dateObj}
              onChange={this.handleUpdateDate}
              minDate={moment()}
              ref="datePicker"
          />
        </span>
      </div>
    )
  }

  showDatePicker(event) {
    event.stopPropagation();
    this.refs.datePicker.setOpen(true);
  }

  getCategoryToggle() {
    const { $$selectedTask } = this.props;

    let deliverableClass;
    let rewardClass;
    if($$selectedTask.get('category') === 0) {
      deliverableClass = ' btn-success';
      rewardClass = ' btn-default';
    } else {
      deliverableClass = ' btn-default';
      rewardClass = ' btn-success';
    }

    return(
      <div className={`${css.categoryToggleContainer}` + " btn-group btn-group-justified"}>
        <a className={`${css.categoryBtn}` + deliverableClass + " btn btn-xs"}
           onClick={this.updateTask.bind(this, "category", 0)}
           name="category"
        >
          Deliverable
        </a>
        <a  className={`${css.categoryBtn}` + rewardClass + " btn btn-xs"}
            onClick={this.updateTask.bind(this, "category", 1)}
            name="category"
        >
          Reward
        </a>
      </div>
    )
  }

  getTaskTitleInput() {
    const title = this.props.$$selectedTask.get('title');

    return(
      <textarea
            className={`${css.taskTitle}` + " form-control"}
            value={title}
            onChange={this.handleUpdateText}
            name="title"
            placeholder="Task title"
            rows="3"
      ></textarea>
    )
  }

  getDropdownOptions() {
    const { $$partners, $$selectedTask } = this.props;

    let $$filteredPartners = $$partners.filter(function($$partner) {
      return !!$$partner.get('name');
    })

    return $$filteredPartners.map(function($$partner) {
      let newObject = {};
      newObject.value = $$partner.get('id');
      newObject.label = $$partner.get('name');
      newObject.selected = $$partner.get('id') === $$selectedTask.get('partner_id');
      return newObject;
    })
  }

  handlePartnerSelect(partnerId) {
    const { $$selectedTask } = this.props;
    const $$updatedTask = $$selectedTask.set('partner_id', partnerId);
    this.props.updateTask($$updatedTask);
    this.props.putTask($$updatedTask);
  }

  getTaskDescriptionInput() {
    const description = this.props.$$selectedTask.get('description');

    return(
      <textarea
            className={`${css.taskDescription}` + " form-control"}
            value={description}
            onChange={this.handleUpdateText}
            name="description"
            placeholder="Task description"
            rows="3"
      ></textarea>
    )
  }

  handleUpdateDate(newDate) {
    const newDateStr = newDate.format("YYYY-MM-DD");
    this.updateTask("deadline", newDateStr);
  }

  handleUpdateText(event) {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;

    this.updateTask(name, value);
  }

  updateTask(name, value) {
    const { $$selectedTask } = this.props;
    const $$updatedTask = $$selectedTask.set(name, value);

    this.props.updateTask($$updatedTask);
    this.putTask($$updatedTask);
  }

  putTask($$updatedTask) {
    this.props.putTask($$updatedTask);
  }

  handleDeleteTask() {
    const { $$selectedTask } = this.props;
    this.props.closeTaskWindow();
    this.props.deleteTask($$selectedTask);
  }
};
