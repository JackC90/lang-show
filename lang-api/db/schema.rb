# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180211150654) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "article_users", force: :cascade do |t|
    t.integer  "article_id"
    t.integer  "user_id"
    t.boolean  "is_owner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_article_users_on_article_id", using: :btree
    t.index ["user_id"], name: "index_article_users_on_user_id", using: :btree
  end

  create_table "article_words", force: :cascade do |t|
    t.integer  "word_id"
    t.integer  "encounter_no"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "article_id"
    t.index ["article_id"], name: "index_article_words_on_article_id", using: :btree
    t.index ["word_id"], name: "index_article_words_on_word_id", using: :btree
  end

  create_table "articles", force: :cascade do |t|
    t.text     "title",      default: "", null: false
    t.text     "body",       default: ""
    t.text     "source_url", default: ""
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer  "task_id"
    t.boolean  "is_done"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.text     "description", default: "", null: false
    t.index ["task_id"], name: "index_items_on_task_id", using: :btree
  end

  create_table "languages", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "code",        default: "", null: false
    t.string   "native_name"
  end

  create_table "sentences", force: :cascade do |t|
    t.text     "text"
    t.text     "source_url"
    t.text     "reference"
    t.text     "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "task_articles", force: :cascade do |t|
    t.integer  "article_id"
    t.integer  "task_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_task_articles_on_article_id", using: :btree
    t.index ["task_id"], name: "index_task_articles_on_task_id", using: :btree
  end

  create_table "task_words", force: :cascade do |t|
    t.integer  "task_id"
    t.integer  "word_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_task_words_on_task_id", using: :btree
    t.index ["word_id"], name: "index_task_words_on_word_id", using: :btree
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "start_date"
    t.datetime "deadline"
    t.text     "notes"
    t.integer  "status"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "language_id"
    t.index ["language_id"], name: "index_tasks_on_language_id", using: :btree
    t.index ["user_id"], name: "index_tasks_on_user_id", using: :btree
  end

  create_table "user_words", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "word_id"
    t.boolean  "is_owner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_words_on_user_id", using: :btree
    t.index ["word_id"], name: "index_user_words_on_word_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "username",               default: "",      null: false
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.json     "tokens"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  create_table "word_sentences", force: :cascade do |t|
    t.integer  "word_id"
    t.integer  "sentence_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["sentence_id"], name: "index_word_sentences_on_sentence_id", using: :btree
    t.index ["word_id"], name: "index_word_sentences_on_word_id", using: :btree
  end

  create_table "words", force: :cascade do |t|
    t.string   "text"
    t.string   "alt_text"
    t.string   "pinyin"
    t.text     "meaning"
    t.text     "note"
    t.integer  "language_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["language_id"], name: "index_words_on_language_id", using: :btree
  end

  add_foreign_key "article_users", "articles"
  add_foreign_key "article_users", "users"
  add_foreign_key "article_words", "articles"
  add_foreign_key "article_words", "words"
  add_foreign_key "items", "tasks"
  add_foreign_key "task_articles", "articles"
  add_foreign_key "task_articles", "tasks"
  add_foreign_key "task_words", "tasks"
  add_foreign_key "task_words", "words"
  add_foreign_key "tasks", "languages"
  add_foreign_key "tasks", "users"
  add_foreign_key "user_words", "users"
  add_foreign_key "user_words", "words"
  add_foreign_key "word_sentences", "sentences"
  add_foreign_key "word_sentences", "words"
  add_foreign_key "words", "languages"
end
