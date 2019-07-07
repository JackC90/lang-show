class WordSentencesController < ApplicationController
  before_action :set_word_sentence, only: [:show, :edit, :update, :destroy]

  # GET /word_sentences
  # GET /word_sentences.json
  def index
    @word_sentences = WordSentence.all
  end

  # GET /word_sentences/1
  # GET /word_sentences/1.json
  def show
  end

  # GET /word_sentences/new
  def new
    @word_sentence = WordSentence.new
  end

  # GET /word_sentences/1/edit
  def edit
  end

  # POST /word_sentences
  # POST /word_sentences.json
  def create
    @word_sentence = WordSentence.new(word_sentence_params)

    respond_to do |format|
      if @word_sentence.save
        format.html { redirect_to @word_sentence, notice: 'Word sentence was successfully created.' }
        format.json { render :show, status: :created, location: @word_sentence }
      else
        format.html { render :new }
        format.json { render json: @word_sentence.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /word_sentences/1
  # PATCH/PUT /word_sentences/1.json
  def update
    respond_to do |format|
      if @word_sentence.update(word_sentence_params)
        format.html { redirect_to @word_sentence, notice: 'Word sentence was successfully updated.' }
        format.json { render :show, status: :ok, location: @word_sentence }
      else
        format.html { render :edit }
        format.json { render json: @word_sentence.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /word_sentences/1
  # DELETE /word_sentences/1.json
  def destroy
    @word_sentence.destroy
    respond_to do |format|
      format.html { redirect_to word_sentences_url, notice: 'Word sentence was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word_sentence
      @word_sentence = WordSentence.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def word_sentence_params
      params.require(:word_sentence).permit(:word_id, :sentence_id)
    end
end
