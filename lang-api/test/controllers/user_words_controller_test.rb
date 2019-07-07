require 'test_helper'

class UserWordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_word = user_words(:one)
  end

  test "should get index" do
    get user_words_url
    assert_response :success
  end

  test "should get new" do
    get new_user_word_url
    assert_response :success
  end

  test "should create user_word" do
    assert_difference('UserWord.count') do
      post user_words_url, params: { user_word: { is_owner: @user_word.is_owner, user_id: @user_word.user_id, word_id: @user_word.word_id } }
    end

    assert_redirected_to user_word_url(UserWord.last)
  end

  test "should show user_word" do
    get user_word_url(@user_word)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_word_url(@user_word)
    assert_response :success
  end

  test "should update user_word" do
    patch user_word_url(@user_word), params: { user_word: { is_owner: @user_word.is_owner, user_id: @user_word.user_id, word_id: @user_word.word_id } }
    assert_redirected_to user_word_url(@user_word)
  end

  test "should destroy user_word" do
    assert_difference('UserWord.count', -1) do
      delete user_word_url(@user_word)
    end

    assert_redirected_to user_words_url
  end
end
