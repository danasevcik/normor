class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :votes
      t.integer :issue_id

      t.timestamps
    end
  end
end
