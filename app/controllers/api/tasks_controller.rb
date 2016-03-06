class Api::TasksController < ApplicationController
  def index
    @tasks = Task.all.order(params[:selectedSortType])
    render 'tasks/index.json'
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render 'tasks/index.json'
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
                :selectedSortType
                )
    end
end
