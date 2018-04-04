require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "test user has all appropriate attributes" do
    user = User.new
    assert_not user.valid?, "New User was valid without data"

    # Assert User throws errors when email, password or client_id are blank
    assert_includes user.errors.keys, :email, "New user saved without a required email"
    assert_includes user.errors.keys, :password, "New user saved witout a required password"

    # Assert User throws errors when password_complexity is not met, or is too long
    user.password = "a"
    user.save
    user.valid?
    assert_includes user.errors.keys, :password, "New User saved without proper password complexity: too short, no capital letter, no number - password 'a'"

    user.password = "1a"
    user.save
    user.valid?
    assert_includes user.errors.keys, :password, "New User saved without proper password complexity: too short, no capital letter - password '1a'"

    user.password = "1aA"
    user.save
    user.valid?
    assert_includes user.errors.keys, :password, "New User saved with too short of password"

    user.password = "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890aA"
    user.save
    user.valid?
    assert_includes user.errors.keys, :password, "New User saved with too long of password"

    user.password = "1234567aA"
    user.save
    assert_not_includes user.errors.keys, :password, "New User NOT saved with valid password - password '1234567aA'"
  end
end
