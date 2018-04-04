require 'test_helper'

class RootPathTest < ActionDispatch::IntegrationTest

  test "get home page via root_path" do
    get root_path
    assert_response :success, "Root Path get response failed"
  end
end
