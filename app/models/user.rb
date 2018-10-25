class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise  :database_authenticatable,
          #:registerable,
          #:recoverable,
          :rememberable,
          :trackable,
          :validatable

  before_save :downcase_role

  validates :auth_tier,
            presence: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 5
            }

  validates :password,
            length: {
              within: 8..72,
              allow_blank: true
            }, if: -> { password.present? }

  validate :password_complexity

  def password_complexity
    if password.present? &&
       !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/)
      errors.add :password, 'must include at least one lowercase letter, one uppercase letter, and one number'
    end
  end

  def downcase_role
    self.role.downcase!
  end

  # defined roles
  def admin?
    role == 'admin'
  end
  alias is_admin? admin?

  def auth_tier_0?
    auth_tier <= 0
  end
  alias is_auth_tier_0? auth_tier_0?

  def auth_tier_1?
    auth_tier <= 1
  end
  alias is_auth_tier_1? auth_tier_1?

  def auth_tier_2?
    auth_tier <= 2
  end
  alias is_auth_tier_2? auth_tier_2?

  def auth_tier_3?
    auth_tier <= 3
  end
  alias is_auth_tier_3? auth_tier_3?

  def auth_tier_4?
    auth_tier <= 4
  end
  alias is_auth_tier_4? auth_tier_4?

  def auth_tier_5?
    auth_tier <= 5
  end
  alias is_auth_tier_5? auth_tier_5?
end
