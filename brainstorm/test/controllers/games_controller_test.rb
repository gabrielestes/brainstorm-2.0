require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get leaderboard" do
    get games_leaderboard_url
    assert_response :success
  end

end
