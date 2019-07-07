class WordsController < ApplicationController
  before_action :set_word, only: [:show, :edit, :update, :destroy]
  before_action :set_task, only: [:create, :update, :destroy]
  before_action :set_article, only: [:create, :update, :destroy]
  respond_to :html, :json
  
  # GET /words
  # GET /words.json
  def index
    @words = current_user.words.filter(filter_params).order('updated_at ASC')
    respond_with(@words)
  end

  # GET /words/1
  # GET /words/1.json
  def show
    respond_to do |format|
      format.json  { render :json => @word.to_json(:include => [:sentences])}
    end
  end

  # GET /words/new
  def new
    @word = Word.new
  end

  # GET /words/1/edit
  def edit
  end

  # POST /words
  # POST /words.json
  def create
    @word = current_user.words.new(word_params)
    if @word.save
      @user_word = @word.user_words.new(user_id: current_user.id, is_owner: true)

      if @task then @task.words << @word end
      if @article then @article.words << @word end
    end

    respond_to do |format|
      if @word.save
        format.html { redirect_to @word, notice: 'Word was successfully created.' }
        format.json { render :show, status: :created, location: @word }
      else
        format.html { render :new }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /words/1
  # PATCH/PUT /words/1.json
  def update
    respond_to do |format|
      if @word.update(word_params)
        format.html { redirect_to @word, notice: 'Word was successfully updated.' }
        format.json { render :show, status: :ok, location: @word }
      else
        format.html { render :edit }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /words/1
  # DELETE /words/1.json
  def destroy
    @word.destroy
    respond_to do |format|
      format.html { redirect_to words_url, notice: 'Word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word
      @word = Word.find(params[:id])
    end

    def set_task
      @task = params[:task_id]? Task.find(params[:task_id]) : nil
    end

    def set_article
      @article = params[:article_id]? Article.find(params[:article_id]) : nil
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def word_params
      params.require(:word).permit(:text, :alt_text, :pinyin, :meaning, :note, :language_id)
    end

    def filter_params
      params.permit(:text, :alt_text, :pinyin, :meaning, :note, :task_id, :article_id)
    end
end
