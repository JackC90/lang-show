require 'test_helper'

class TaskArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_article = task_articles(:one)
  end

  test "should get index" do
    get task_articles_url
    assert_response :success
  end

  test "should get new" do
    get new_task_article_url
    assert_response :success
  end

  test "should create task_article" do
    assert_difference('TaskArticle.count') do
      post task_articles_url, params: { task_article: { article_id: @task_article.article_id, task_id: @task_article.task_id } }
    end

    assert_redirected_to task_article_url(TaskArticle.last)
  end

  test "should show task_article" do
    get task_article_url(@task_article)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_article_url(@task_article)
    assert_response :success
  end

  test "should update task_article" do
    patch task_article_url(@task_article), params: { task_article: { article_id: @task_article.article_id, task_id: @task_article.task_id } }
    assert_redirected_to task_article_url(@task_article)
  end

  test "should destroy task_article" do
    assert_difference('TaskArticle.count', -1) do
      delete task_article_url(@task_article)
    end

    assert_redirected_to task_articles_url
  end
end
