class Api::IncentivesController < ApplicationController
  def create
    @incentive  = Incentive.create! code: params[:code]
    @incentives = Incentive.all

    render json: @incentives.to_json
  end

  def index
    @incentives = Incentive.all
    
    render json: @incentives.to_json
  end

  def new
    @incentive = Incentive.new code: Nanoid.generate(size: 8)

    render json: @incentive.to_json
  end

  def update
    @incentive = Incentive.find(params[:id])

    @incentive.update!(update_params)

    render json: @incentive.to_json
  end

  private

  def update_params
    params.require(:incentive).permit(:code)
  end
end
