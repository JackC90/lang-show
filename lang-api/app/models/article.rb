class Article < ApplicationRecord
  require 'open-uri'
  include Boilerpipe
  include Filterable
  include PgSearch

  has_many :task_articles
  has_many :tasks, through: :task_articles

  has_many :article_users
  has_many :users, through: :article_users

  has_many :article_words
  has_many :words, through: :article_words

  # Filter scopes
  pg_search_scope :title, :against  => :title
  pg_search_scope :body, :against   => :body
  scope :task_id,   -> (task_id) { joins(:task_articles).where("task_id = ?", task_id) }
  scope :word_id,   -> (word_id) { joins(:article_words).where("word_id = ?", word_id) }

  def self.scrapeFromUrl(source_url, extract_body = true)
    content      = open(source_url).read
    doc           = Boilerpipe::SAX::BoilerpipeHTMLParser.parse(content)

    # Extract article body with Boilerpipe 
    extract_body = ActiveModel::Type::Boolean.new.cast(extract_body)
    title = doc.title
    body  = nil

    if extract_body
      doc   = Boilerpipe::Extractors::ArticleExtractor.process(doc)
      doc   = Boilerpipe::Filters::SplitParagraphBlocksFilter.process(doc)
      
      body = []
      doc.text_blocks.each do |text_block|
        block_string = "\n#{text_block.text}\n"
        body.push(block_string)
      end
      body = body.join("")
    end

    return { :title  => title, :body => body, :source_url => source_url }
  end
end
