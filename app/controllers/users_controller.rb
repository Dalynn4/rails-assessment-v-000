class UsersController < ApplicationController

   def new
     @user = User.new
   end

   def create
     @user = User.new(user_params)
     if @user.valid?
       @user.save
       session[:user_id] = @user.id
       redirect_to user_path(@user)
     else
       render :new
     end
   end

   def show
     @user = User.find(session[:user_id])
   end

   def guides
     @user = User.find(params[:id])
     render json: @user
   end

   private

   def user_params
     params.require(:user).permit(:user_name, :password)
   end
end
