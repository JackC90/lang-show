json.extract! user_word, :id, :user_id, :word_id, :is_owner, :created_at, :updated_at
json.url user_word_url(user_word, format: :json)
