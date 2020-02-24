class MoodsController < ApplicationController
  def index
    moods = Mood.all 
    render json: moods, include: [:prompts]
  end

  def show
    mood = Mood.find(params[:id])
    render json: mood, include: [:prompts]
  end
end
