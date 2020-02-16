class CreatePrompts < ActiveRecord::Migration[6.0]
  def change
    create_table :prompts do |t|
      t.string :desc
      t.belongs_to :mood, null: false, foreign_key: true

      t.timestamps
    end
  end
end
