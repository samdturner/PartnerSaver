class PagesController < ApplicationController
  before_action :set_tasks

  def tasks
  end

  private
  
    def set_tasks
      @tasks = Task.all.order("id DESC")
    end
end
