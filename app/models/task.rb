class Task < ActiveRecord::Base
  validates :title, :length => { :maximum => 500 }
  validates :description, :length => { :maximum => 2000 }
  validate :deadline_cannot_be_in_the_past

  def deadline_cannot_be_in_the_past
    errors.add(:deadline, "can't be in the past") if
      !deadline.blank? && deadline < Date.today
  end
end
