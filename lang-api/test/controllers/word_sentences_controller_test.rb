require 'test_helper'

class WordSentencesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @word_sentence = word_sentences(:one)
  end

  test "should get index" do
    get word_sentences_url
    assert_response :success
  end

  test "should get new" do
    get new_word_sentence_url
    assert_response :success
  end

  test "should create word_sentence" do
    assert_difference('WordSentence.count') do
      post word_sentences_url, params: { word_sentence: { sentence_id: @word_sentence.sentence_id, word_id: @word_sentence.word_id } }
    end

    assert_redirected_to word_sentence_url(WordSentence.last)
  end

  test "should show word_sentence" do
    get word_sentence_url(@word_sentence)
    assert_response :success
  end

  test "should get edit" do
    get edit_word_sentence_url(@word_sentence)
    assert_response :success
  end

  test "should update word_sentence" do
    patch word_sentence_url(@word_sentence), params: { word_sentence: { sentence_id: @word_sentence.sentence_id, word_id: @word_sentence.word_id } }
    assert_redirected_to word_sentence_url(@word_sentence)
  end

  test "should destroy word_sentence" do
    assert_difference('WordSentence.count', -1) do
      delete word_sentence_url(@word_sentence)
    end

    assert_redirected_to word_sentences_url
  end
end
