class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :title
      t.text :description
      t.date :deadline
      t.binary :task_type, :default => 0

      t.timestamps null: false
    end
  end
end
