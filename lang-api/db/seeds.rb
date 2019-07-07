# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def gen_languages
  language = Language.find_by_id(1)

  if language.blank?
    Language.create(name: "Chinese", code: "zh-CN", native_name: "中文")
  else
    Language.update(name: "Chinese", code: "zh-CN", native_name: "中文")
  end
end

# ====================
#
# Generate Dummy Data
#
# ====================

def gen_dummy_users
  num = (1..5).to_a
  users = num.map {|n| "user" + n.to_s}
  emails = users.map {|e| e + "@mailforspam.com" }
  num.each{ |n| User.create(email: emails[n - 1], password: "12312312", password_confirmation: "12312312", username: users[n - 1]) }
end

def gen_dummy_tasks
  user_num = (1..5).to_a
  task_num = (1..6).to_a

  user_num.each do |x|
    user = User.find_by(username: "user" + x.to_s)
    task_num.each do |t|
      user.tasks.create(title: "Task " + t.to_s, description: FFaker::Book.description, start_date: DateTime.now , deadline: DateTime.now + 7.days , notes: FFaker::Book.genre, status: 0, language_id: 1)
    end
  end
end

def gen_dummy_items
  task_num = (1..6).to_a

  task_num.each do |t|
    task = Task.find_by(title: "Task " + t.to_s)

    3.times do |t|
      task.items.create(description: FFaker::DizzleIpsum.sentence, is_done: false)
    end
  end  
end

def gen_dummy_word_sentences
  task_num = (1..6).to_a
  user_num = (1..5).to_a

  user_num.each do |u|
    user = User.find_by(username: "user" + u.to_s)

    task_num.each do |t|
      task = Task.find_by(title: "Task " + t.to_s)
      5.times do
        word = user.words.create(text: "好", pinyin: "hăo", meaning: "Good", note: "test", language_id: 1)
        task_word = word.task_words.create(task_id: task.id)
        word.sentences.create(text: word.text + FFaker::LoremCN.sentence, source_url: FFaker::InternetSE.http_url, reference: FFaker::LoremCN.word, note: FFaker::Book.genre)
      end
    end
  end
end



# ====================
#
# Run Below!
#
# ====================
gen_languages

# Dummy
gen_dummy_users
gen_dummy_tasks
gen_dummy_items
gen_dummy_word_sentences
