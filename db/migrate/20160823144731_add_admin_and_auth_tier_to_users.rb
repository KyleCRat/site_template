class AddAdminAndAuthTierToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :role, :string
    add_column :users, :auth_tier, :int
  end
end
