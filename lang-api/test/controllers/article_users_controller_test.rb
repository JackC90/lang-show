require 'test_helper'

class ArticleUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @article_user = article_users(:one)
  end

  test "should get index" do
    get article_users_url
    assert_response :success
  end

  test "should get new" do
    get new_article_user_url
    assert_response :success
  end

  test "should create article_user" do
    assert_difference('ArticleUser.count') do
      post article_users_url, params: { article_user: { article_id: @article_user.article_id, is_owner: @article_user.is_owner, user_id: @article_user.user_id } }
    end

    assert_redirected_to article_user_url(ArticleUser.last)
  end

  test "should show article_user" do
    get article_user_url(@article_user)
    assert_response :success
  end

  test "should get edit" do
    get edit_article_user_url(@article_user)
    assert_response :success
  end

  test "should update article_user" do
    patch article_user_url(@article_user), params: { article_user: { article_id: @article_user.article_id, is_owner: @article_user.is_owner, user_id: @article_user.user_id } }
    assert_redirected_to article_user_url(@article_user)
  end

  test "should destroy article_user" do
    assert_difference('ArticleUser.count', -1) do
      delete article_user_url(@article_user)
    end

    assert_redirected_to article_users_url
  end
end
