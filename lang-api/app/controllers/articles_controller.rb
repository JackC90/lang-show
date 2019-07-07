class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]
  before_action :set_task, only: [:edit, :create, :update, :destroy]
  respond_to :html, :json

  # GET /articles/extract
  # GET /articles/extract.json
  def extract   
    extracted = Article.scrapeFromUrl(extract_params[:source_url], extract_params[:extract_body])
    
    respond_to do |format|
      format.json { render json: extracted }
    end
  end

  # GET /articles
  # GET /articles.json
  def index
    @articles = current_user.articles.filter(filter_params)
    respond_with(@articles)
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
    respond_to do |format|
      format.json  { render :json => @article.to_json(:include => [:tasks])}
    end
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)
    current_user.articles << @article

    if @task
      @task.articles << @article
    end

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article.destroy
    respond_to do |format|
      format.html { redirect_to articles_url, notice: 'Article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    def set_task
      @task = params[:task_id]? Task.find(params[:task_id]) : nil
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:title, :body, :source_url, :task_id)
    end

    def filter_params
      params.permit(:title, :body, :task_id, :word_id)
    end

    def extract_params
      params.permit(:source_url, :extract_body)
    end
end
