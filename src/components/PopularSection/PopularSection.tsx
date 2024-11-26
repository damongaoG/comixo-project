import React from 'react';
import { Link } from "react-router-dom";
import { OperatorVo } from '../../types/operator-vo';

interface PopularSectionProps {
  operators: OperatorVo[];
}

const PopularSection: React.FC<PopularSectionProps> = ({ operators }) => {
  // Sort operators by widgetIndex
  const sortedOperators = [...operators].sort((a, b) => 
    (a.widgetIndex ?? 0) - (b.widgetIndex ?? 0)
  );

  return (
    <section id="popular">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 section-title">
            <span>Popular</span>
            <h3>Explore Our Creativity.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/list" className="button-primary">Browse All</Link>
          </div>
          {sortedOperators.map((operator, index) => (
            <div key={operator.id} className="col-lg-6 col-md-9 mobile-m-auto">
              <div className={`popular-item ${index % 2 === 1 ? 'right' : ''} ${index === sortedOperators.length - 1 ? 'mb-0' : ''}`}>
                <p>{new Date().getFullYear()}</p>
                <div className={`col-lg-10 ${index % 2 === 1 ? 'me-auto' : 'ms-auto'}`}>
                  <img
                    style={{ width: '530px', height: '663px', objectFit: 'contain', background: 'black' }}
                    src={operator.imageURL} alt={operator.title} className="img-fluid" />
                  <Link to={`/detail?id=${operator.nanoId}`}>{operator.title.length > 50 ? `${operator.title.substring(0, 50)}...` : operator.title}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
