class CreatePartners < ActiveRecord::Migration
  def change
    create_table :partners do |t|
      t.text :name
      t.text :note
      t.integer :relationship_status
      t.boolean :is_deleted

      t.timestamps null: false
    end
  end
end
