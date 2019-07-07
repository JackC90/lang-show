class TaskWordsController < ApplicationController
  before_action :set_task_word, only: [:show, :edit, :update, :destroy]
  before_action :set_task, only: [:index, :show, :create, :edit, :update, :destroy]

  # GET /task_words
  # GET /task_words.json
  def index
    @words = @task.words
  end

  # GET /task_words/1
  # GET /task_words/1.json
  def show
  end

  # GET /task_words/new
  def new
    @task_word = TaskWord.new
  end

  # GET /task_words/1/edit
  def edit
  end

  # POST /task_words
  # POST /task_words.json
  def create
    @task_word = TaskWord.new(task_word_params)
    respond_to do |format|
      if @task_word.save
        format.html { redirect_to [@task, @task_word], notice: 'Task word was successfully created.' }
        format.json { render :show, status: :created, location: @task_word }
      else
        format.html { render :new }
        format.json { render json: @task_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /task_words/1
  # PATCH/PUT /task_words/1.json
  def update
    respond_to do |format|
      if @task_word.update(task_word_params)
        format.html { redirect_to [@task, @task_word], notice: 'Task word was successfully updated.' }
        format.json { render :show, status: :ok, location: @task_word }
      else
        format.html { render :edit }
        format.json { render json: @task_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task_words/1
  # DELETE /task_words/1.json
  def destroy
    @task_word.destroy
    respond_to do |format|
      format.html { redirect_to task_task_words_url, notice: 'Task word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_word
      @task_word = TaskWord.find(params[:id])
    end

    def set_task
      @task = Task.find(params[:task_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_word_params
      params.require(:task_word).permit(:task_id, :word_id)
    end
end
