class SentencesController < ApplicationController
  before_action :set_sentence, only: [:show, :edit, :update, :destroy]
  before_action :set_word, only: [:show, :edit, :create, :update, :destroy]

  # GET /sentences
  # GET /sentences.json
  def index
    @sentences = @word.sentences.all
  end

  # GET /sentences/1
  # GET /sentences/1.json
  def show
  end

  # GET /sentences/new
  def new
    @sentence = Sentence.new
  end

  # GET /sentences/1/edit
  def edit
  end

  # POST /sentences
  # POST /sentences.json
  def create
    @sentence = Sentence.new(sentence_params)
    @word.sentences << @sentence

    respond_to do |format|
      if @sentence.save
        format.html { redirect_to word_sentence_url(@word, @sentence), notice: 'Sentence was successfully created.' }
        format.json { render :show, status: :created, location: word_sentence_url(@word, @sentence) }
      else
        format.html { render :new }
        format.json { render json: @sentence.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sentences/1
  # PATCH/PUT /sentences/1.json
  def update
    respond_to do |format|
      if @sentence.update(sentence_params)
        format.html { redirect_to word_sentence_url(@word, @sentence), notice: 'Sentence was successfully updated.' }
        format.json { render :show, status: :ok, location: word_sentence_url(@word, @sentence) }
      else
        format.html { render :edit }
        format.json { render json: @sentence.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sentences/1
  # DELETE /sentences/1.json
  def destroy
    @sentence.destroy
    respond_to do |format|
      format.html { redirect_to sentences_url, notice: 'Sentence was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sentence
      @sentence = Sentence.find(params[:id])
    end

    def set_word
      @word = Word.find(params[:word_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sentence_params
      params.require(:sentence).permit(:text, :source_url, :reference, :note)
    end

    def word_sentence_params
      params.permit(:word_id)
    end
end
