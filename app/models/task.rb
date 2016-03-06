require 'stamp'

class Task < ActiveRecord::Base
  validates :title, :length => { :maximum => 500 }
  validates :description, :length => { :maximum => 2000 }
  # validate :deadline_cannot_be_in_the_past

  after_initialize :add_overdue_status, :format_deadline
  # before_save :parse_deadline

  attr_accessor :is_overdue, :pretty_deadline

  STATUS_LIST = %w{ INCOMPLETE IN_PROGRESS COMPLETE }

  STATUS_LIST.each_with_index do |method, index|
    define_method("#{method}?") { status == index }
  end

  CATEGORY_LIST = %w{ DELIVERABLE REWARD }

  CATEGORY_LIST.each_with_index do |method, index|
    define_method("#{method}?") { category == index }
  end

  def deadline_cannot_be_in_the_past
    errors.add(:deadline, "can't be in the past") if
      !deadline.blank? && deadline < Date.today
  end

  def add_overdue_status
    self.is_overdue = deadline >= Date.today
  end

  def format_deadline
    self.pretty_deadline = deadline.stamp("12/31/2016")
  end
end
