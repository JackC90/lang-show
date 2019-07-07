json.extract! word, :id, :text, :alt_text, :pinyin, :meaning, :note, :language_id, :created_at, :updated_at
json.url word_url(word, format: :json)
