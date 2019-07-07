json.extract! article, :id, :title, :body, :source_url, :created_at, :updated_at
json.url article_url(article, format: :json)
