class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :user_id, index: true
      t.integer :score

      t.timestamps
    end
  end
end
