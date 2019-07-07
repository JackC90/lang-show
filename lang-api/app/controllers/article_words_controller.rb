class ArticleWordsController < ApplicationController
  before_action :set_article_word, only: [:show, :edit, :update, :destroy]

  # GET /article_words
  # GET /article_words.json
  def index
    @article_words = ArticleWord.all
  end

  # GET /article_words/1
  # GET /article_words/1.json
  def show
  end

  # GET /article_words/new
  def new
    @article_word = ArticleWord.new
  end

  # GET /article_words/1/edit
  def edit
  end

  # POST /article_words
  # POST /article_words.json
  def create
    @article_word = ArticleWord.new(article_word_params)

    respond_to do |format|
      if @article_word.save
        format.html { redirect_to @article_word, notice: 'Article word was successfully created.' }
        format.json { render :show, status: :created, location: @article_word }
      else
        format.html { render :new }
        format.json { render json: @article_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /article_words/1
  # PATCH/PUT /article_words/1.json
  def update
    respond_to do |format|
      if @article_word.update(article_word_params)
        format.html { redirect_to @article_word, notice: 'Article word was successfully updated.' }
        format.json { render :show, status: :ok, location: @article_word }
      else
        format.html { render :edit }
        format.json { render json: @article_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /article_words/1
  # DELETE /article_words/1.json
  def destroy
    @article_word.destroy
    respond_to do |format|
      format.html { redirect_to article_words_url, notice: 'Article word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article_word
      @article_word = ArticleWord.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_word_params
      params.require(:article_word).permit(:article_user_id, :word_id, :encounter_no)
    end
end
