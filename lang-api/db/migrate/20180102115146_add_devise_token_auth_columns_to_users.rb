class AddDeviseTokenAuthColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    ## Required
    add_column :users, :provider, :string, :null => false, :default => "email"
    add_column :users, :uid,      :string, :null => false, :default => ""

    ## Confirmable
    add_column :users, :confirmation_token,   :string
    add_column :users, :confirmed_at,         :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :unconfirmed_email,    :string # Only if using reconfirmable

    ## Tokens
    add_column :users, :tokens,   :json

    # https://github.com/lynndylanhurley/devise_token_auth/issues/181
    User.reset_column_information
    User.find_each do |user|
      user.uid = user.email
      user.provider = 'email'
      user.save!
    end

    add_index :users, [:uid, :provider],     unique: true
    add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,       unique: true
  end
end
