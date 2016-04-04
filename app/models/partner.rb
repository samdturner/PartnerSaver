class Partner < ActiveRecord::Base
  has_many :tasks

  RELATIONSHIP_STATUS_LIST = %w{ CLUSTERFUCK NEEDS_IMPROVEMENT BEST_FRIENDS }

  RELATIONSHIP_STATUS_LIST.each_with_index do |method, index|
    define_method("#{method}?") { status == index }
  end
end
