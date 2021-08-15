class Incentive < ApplicationRecord
  validates :code, uniqueness: true
end
