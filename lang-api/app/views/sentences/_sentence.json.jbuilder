json.extract! sentence, :id, :text, :source_url, :reference, :note, :created_at, :updated_at
json.url word_sentence_url(@word, @sentence, format: :json)
