class Api::TasksController < ApplicationController
  def index
    selectedSortType = params[:selectedSortType] || "deadline"

    hasJoined = false
    @tasks = Task.all
    if selectedSortType == "partners.name" || selectedSortType == "partners.name desc"
      @tasks = @tasks.joins('LEFT OUTER JOIN partners ON partners.id = tasks.partner_id')
                      .order(selectedSortType)
      hasJoined = true
    elsif
      @tasks = @tasks.order(selectedSortType)
    end

    if !params[:keywordSearchTerm].blank?
      if !hasJoined
        @tasks = @tasks.joins('LEFT OUTER JOIN partners ON partners.id = tasks.partner_id')
      end
      @tasks = @tasks.select { |task| task.contains_substr?(params[:keywordSearchTerm]) }
    end

    render 'tasks/index.json'
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render 'tasks/_task.json', locals: { task: @task }
    else
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find_by(id: params[:id])
    if @task.update_attributes(task_params)
      render 'tasks/_task.json', locals: { task: @task }
    else
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @task = Task.find_by(id: params[:id])
    if @task
      @task.delete
      render json: {"success" => "task successfully deleted"}, status: :ok
    else
      render json: {"error" => "task not found"}, status: :not_found
    end
  end

  private

    def task_params
      params.permit(
                :id,
                :title,
                :description,
                :deadline,
                :category,
                :status,
                :partner_id,
                :selectedSortType
                )
    end
end
