json.extract! article_user, :id, :article_id, :user_id, :is_owner, :created_at, :updated_at
json.url article_user_url(article_user, format: :json)
