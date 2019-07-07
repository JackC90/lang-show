class User < ApplicationRecord
  has_many :tasks
  has_many :user_words
  has_many :words, through: :user_words

  has_many :article_users
  has_many :articles, through: :article_users

  include DeviseTokenAuth::Concerns::User

  before_create :skip_confirmation!
  validates :username, :presence => true, :uniqueness => {
    :case_sensitive => false
  }
  # Only allow letter, number, underscore and punctuation.
  validate :validate_username

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :confirmable, :omniauthable
    # :authentication_keys => [:login]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  # Virtual attribute for authenticating by either username or email
  # This is in addition to a real persisted field like 'username'
  # attr_accessor :login

  # def login=(login)
  #   @login = login
  # end

  # def login
  #   @login || self.username || self.email
  # end

  # def self.find_for_database_authentication(warden_conditions)
  #   conditions = warden_conditions.dup
  #   if login = conditions.delete(:login)
  #     where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
  #   elsif conditions.has_key?(:username) || conditions.has_key?(:email)
  #     where(conditions.to_hash).first
  #   end
  # end

  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end
end
