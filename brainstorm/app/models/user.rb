# require 'bcrypt'

class User < ApplicationRecord
  # include BCrypt

  has_many :games

  has_secure_password
  #
  # attr_accessor :email, :password, :password_confirmation
  #
  # validates_uniqueness_of :email
  #
  # def password
  #   @password ||= Password.new(password_hash)
  # end
  #
  # def password=(new_password)
  #   @password = Password.create(new_password)
  #   self.password_hash = @password
  # end
end
