require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest

  test "root_path should use pages#home" do
    assert_routing(root_path, :controller => "pages", :action => "home" )
  end

end
