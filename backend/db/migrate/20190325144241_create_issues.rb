class CreateIssues < ActiveRecord::Migration[5.2]
  def change
    create_table :issues do |t|
      t.string :title
      t.integer :zipcode
      t.integer :votes
      t.integer :category_id
      t.string :description
      t.boolean :resolved

      t.timestamps
    end
  end
end
