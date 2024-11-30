import { Form } from 'antd';
import React, { useState, useContext } from 'react';
import { Plan } from "../../types/plan";
import usePlan from "./usePlan";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from 'react-router-dom';

const PricePlanSection: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const { isLogin, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const isCurrentPlan = (planId: string) => {
    return userProfile?.planId === planId;
  };

  usePlan(setPlans);

  const handleChoosePlan = (e: React.MouseEvent, plan: Plan) => {
    e.preventDefault();

    if (isCurrentPlan(plan.id)) {
      return; // Do nothing if it's the current plan
    }

    if (!isLogin) {
      // If user is not logged in, show the login modal
      const modal = document.getElementById('contact-modal');
      if (modal) {
        const bsModal = new (window as any).bootstrap.Modal(modal);
        bsModal.show();
      }
      return;
    }

    // Redirect to payment page with plan ID when user is logged in
    navigate(`/payment?planId=${plan.id}`);
  };

  return (
    <section id="price-plan">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <div className="col-lg-6">
              <span>Price Plan</span>
              <h3>Read Comics Everyday.</h3>
            </div>
          </div>
        </div>
        <div className="row pt-55">
          <div className="col-lg-12">
            <div className="price-main">
              <div className="row">
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`col-lg-4 col-md-6 price-item text-center ${index === 2 ? 'active' : ''}`}
                  >
                    <div className={index === 2 ? 'mobile-v-bg' : undefined}>
                      <span>{plan.metadata.title}</span>
                      <p>Per {plan.interval}</p>
                      <img src={`/assets/images/price${index + 1}.png`} alt="price-icon" />
                      <h3>AU${plan.amount / 100}</h3>
                      {plan.metadata.description?.split(',').map((feature, idx) => (
                        <p key={idx}>
                          <i className="fa-solid fa-check"></i> {feature.trim()}
                        </p>
                      ))}
                      <div className="price-btn">
                        <a
                          href="#"
                          className={`button-secondary ${isCurrentPlan(plan.id) ? 'disabled' : ''}`}
                          onClick={(e) => handleChoosePlan(e, plan)}
                          style={{ pointerEvents: isCurrentPlan(plan.id) ? 'none' : 'auto' }}
                        >
                          {isCurrentPlan(plan.id) ? 'Current Plan' : 'Choose Plan'}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="row pt-3 price-footer">
          <div className="col-lg-6 col-sm-4">
            {/* <a href="#">Ask Any Question</a> */}
          </div>
          <div className="col-lg-6 col-sm-8 text-end">
            <p><i className="fa-solid fa-lock"></i> All Payments Are Highly Secured.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricePlanSection;
