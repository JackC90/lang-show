json.extract! task_article, :id, :article_id, :task_id, :created_at, :updated_at
json.url task_article_url(task_article, format: :json)
