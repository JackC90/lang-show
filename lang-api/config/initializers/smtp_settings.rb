ActionMailer::Base.smtp_settings = {
    :address => "smtp.gmail.com",
    :port => 587,
    :domain => 'gmail.com',
    :user_name => ENV["mailer_username"],
    :password => ENV["mailer_password"],
    :authentication => "login",
    :enable_starttls_auto => true
}
