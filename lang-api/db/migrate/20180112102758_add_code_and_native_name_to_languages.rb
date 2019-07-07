class AddCodeAndNativeNameToLanguages < ActiveRecord::Migration[5.0]
  def change
    add_column :languages, :code, :string, :null => false, :default => ""
    add_column :languages, :native_name, :string
  end
end
