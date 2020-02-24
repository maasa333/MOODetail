class PromptsController < ApplicationController
  def index
    prompts = Prompt.all 
    render json: prompts
  end

  def show
    prompt = Prompt.find(params[:id])
    render json: prompt
  end

  def create
    mood = Mood.find_by(id: params[:mood_id])
    prompt = Prompt.create(prompt_params)
    render json: prompt, include: :mood
  end

  # def update
  #   prompt = Prompt.find_by(id: params[:id])
  #   prompt.update(prompt_params)
  #   render json: prompt, include: :mood
  # end

  # def destroy
  #   prompt = Prompt.find_by(id: params[:id])
  #   prompt.destroy
  #   # render json: prompt.id
  # end

  private

  def prompt_params
    params.require(:prompt).permit(:desc, :mood_id)
  end
end
