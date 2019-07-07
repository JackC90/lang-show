require 'test_helper'

class TaskWordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_word = task_words(:one)
  end

  test "should get index" do
    get task_words_url
    assert_response :success
  end

  test "should get new" do
    get new_task_word_url
    assert_response :success
  end

  test "should create task_word" do
    assert_difference('TaskWord.count') do
      post task_words_url, params: { task_word: { task_id: @task_word.task_id, word_id: @task_word.word_id } }
    end

    assert_redirected_to task_word_url(TaskWord.last)
  end

  test "should show task_word" do
    get task_word_url(@task_word)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_word_url(@task_word)
    assert_response :success
  end

  test "should update task_word" do
    patch task_word_url(@task_word), params: { task_word: { task_id: @task_word.task_id, word_id: @task_word.word_id } }
    assert_redirected_to task_word_url(@task_word)
  end

  test "should destroy task_word" do
    assert_difference('TaskWord.count', -1) do
      delete task_word_url(@task_word)
    end

    assert_redirected_to task_words_url
  end
end
