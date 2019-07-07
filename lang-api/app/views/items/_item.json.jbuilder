json.extract! item, :id, :task_id, :is_done, :created_at, :updated_at
json.url task_item_url(@task, @item, format: :json)
