class ChangeColumn < ActiveRecord::Migration
  def change
    remove_column :tasks, :task_type, :binary
    add_column :tasks, :category, :integer
  end
end
