class Task < ActiveRecord::Base
  validates :title, :length => { :maximum => 500 }
  validates :description, :length => { :maximum => 2000 }
  # validate :deadline_cannot_be_in_the_past

  after_initialize :add_overdue_status

  attr_accessor :is_overdue

  TYPES = %w{ INCOMPLETE IN_PROGRESS COMPLETE }

  TYPES.each_with_index do |method, index|
    define_method("#{method}?") { type == index }
  end

  def deadline_cannot_be_in_the_past
    errors.add(:deadline, "can't be in the past") if
      !deadline.blank? && deadline < Date.today
  end

  def add_overdue_status
    self.is_overdue = deadline >= Date.today
  end
end
