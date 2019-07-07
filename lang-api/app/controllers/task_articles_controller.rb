class TaskArticlesController < ApplicationController
  before_action :set_task_article, only: [:show, :edit, :update, :destroy]

  # GET /task_articles
  # GET /task_articles.json
  def index
    @task_articles = TaskArticle.all
  end

  # GET /task_articles/1
  # GET /task_articles/1.json
  def show
  end

  # GET /task_articles/new
  def new
    @task_article = TaskArticle.new
  end

  # GET /task_articles/1/edit
  def edit
  end

  # POST /task_articles
  # POST /task_articles.json
  def create
    @task_article = TaskArticle.new(task_article_params)

    respond_to do |format|
      if @task_article.save
        format.html { redirect_to @task_article, notice: 'Task article was successfully created.' }
        format.json { render :show, status: :created, location: @task_article }
      else
        format.html { render :new }
        format.json { render json: @task_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /task_articles/1
  # PATCH/PUT /task_articles/1.json
  def update
    respond_to do |format|
      if @task_article.update(task_article_params)
        format.html { redirect_to @task_article, notice: 'Task article was successfully updated.' }
        format.json { render :show, status: :ok, location: @task_article }
      else
        format.html { render :edit }
        format.json { render json: @task_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task_articles/1
  # DELETE /task_articles/1.json
  def destroy
    @task_article.destroy
    respond_to do |format|
      format.html { redirect_to task_articles_url, notice: 'Task article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_article
      @task_article = TaskArticle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_article_params
      params.require(:task_article).permit(:article_id, :task_id)
    end
end
