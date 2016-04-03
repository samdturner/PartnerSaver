class Api::PartnersController < ApplicationController
  def index
    selectedSortType = params[:selectedSortType] || "deadline"

    @partners = Partner.all
                        .order(selectedSortType)

    render 'partners/index.json'
  end

  def create
    @partner = Partner.new(partner_params)
    if @partner.save
      render 'partners/_partner.json.jbuilder', locals: { partner: @partner }
    else
      render json: @partner.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @partner = Partner.find_by(id: params[:id])
    if @partner.update_attributes(partner_params)
      render 'partners/_partner.json.jbuilder', locals: { partner: @partner }
    else
      render json: @partner.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @partner = Partner.find_by(id: params[:id])
    if @partner
      @partner.delete
      render json: {"success" => "task successfully deleted"}, status: :ok
    else
      render json: {"error" => "task not found"}, status: :not_found
    end
  end

  private

    def partner_params
      params.permit(
                :id,
                :name,
                :note,
                :relationship_status,
                :is_deleted,
                :selectedSortType
                )
    end
end
