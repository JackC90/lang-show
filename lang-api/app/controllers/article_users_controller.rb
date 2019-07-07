class ArticleUsersController < ApplicationController
  before_action :set_article_user, only: [:show, :edit, :update, :destroy]

  # GET /article_users
  # GET /article_users.json
  def index
    @article_users = ArticleUser.all
  end

  # GET /article_users/1
  # GET /article_users/1.json
  def show
  end

  # GET /article_users/new
  def new
    @article_user = ArticleUser.new
  end

  # GET /article_users/1/edit
  def edit
  end

  # POST /article_users
  # POST /article_users.json
  def create
    @article_user = ArticleUser.new(article_user_params)

    respond_to do |format|
      if @article_user.save
        format.html { redirect_to @article_user, notice: 'Article user was successfully created.' }
        format.json { render :show, status: :created, location: @article_user }
      else
        format.html { render :new }
        format.json { render json: @article_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /article_users/1
  # PATCH/PUT /article_users/1.json
  def update
    respond_to do |format|
      if @article_user.update(article_user_params)
        format.html { redirect_to @article_user, notice: 'Article user was successfully updated.' }
        format.json { render :show, status: :ok, location: @article_user }
      else
        format.html { render :edit }
        format.json { render json: @article_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /article_users/1
  # DELETE /article_users/1.json
  def destroy
    @article_user.destroy
    respond_to do |format|
      format.html { redirect_to article_users_url, notice: 'Article user was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article_user
      @article_user = ArticleUser.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_user_params
      params.require(:article_user).permit(:article_id, :user_id, :is_owner)
    end
end
