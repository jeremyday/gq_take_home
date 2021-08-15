class AddRedeemedAtToIncentives < ActiveRecord::Migration[6.0]
  def change
    add_column :incentives, :redeemed_at, :datetime
  end
end
