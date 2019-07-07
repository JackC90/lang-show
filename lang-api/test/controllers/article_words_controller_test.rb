require 'test_helper'

class ArticleWordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @article_word = article_words(:one)
  end

  test "should get index" do
    get article_words_url
    assert_response :success
  end

  test "should get new" do
    get new_article_word_url
    assert_response :success
  end

  test "should create article_word" do
    assert_difference('ArticleWord.count') do
      post article_words_url, params: { article_word: { article_user_id: @article_word.article_user_id, encounter_no: @article_word.encounter_no, word_id: @article_word.word_id } }
    end

    assert_redirected_to article_word_url(ArticleWord.last)
  end

  test "should show article_word" do
    get article_word_url(@article_word)
    assert_response :success
  end

  test "should get edit" do
    get edit_article_word_url(@article_word)
    assert_response :success
  end

  test "should update article_word" do
    patch article_word_url(@article_word), params: { article_word: { article_user_id: @article_word.article_user_id, encounter_no: @article_word.encounter_no, word_id: @article_word.word_id } }
    assert_redirected_to article_word_url(@article_word)
  end

  test "should destroy article_word" do
    assert_difference('ArticleWord.count', -1) do
      delete article_word_url(@article_word)
    end

    assert_redirected_to article_words_url
  end
end
