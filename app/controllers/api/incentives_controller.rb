class Api::IncentivesController < ApplicationController
  def create
    @incentive  = Incentive.create! code: params[:code]
    @incentives = Incentive.all

    render json: @incentives.to_json
  end

  def index
    @incentives = if params.key?(:unredeemed)
                    @incentives = Incentive.where(redeemed_at: nil)
                  else
                    @incentives = Incentive.all
                  end

    render json: @incentives.to_json
  end

  def new
    @incentive = Incentive.new code: Nanoid.generate(size: 8)

    render json: @incentive.to_json
  end

  def redeem
    @incentive = Incentive.find(params[:id])

    @incentive.update_attribute :redeemed_at, DateTime.now

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
