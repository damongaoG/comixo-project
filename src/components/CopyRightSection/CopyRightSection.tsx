import React from 'react';

const CopyRightSection: React.FC = () => {
  return (
    <section id="copy_right">
      <div className="container">
        <div className="row copyright-txt">
          <div className="col-lg-6">
            {/*<span>LANGUAGE: </span>
            <a href="#">BAN</a>
            <a href="#">NL</a>
            <a href="#" className="active">EN</a>
            <a href="#">FR</a>
            <a href="#">EU</a>*/}
          </div>
          <div className="col-lg-6 text-end">
            <p>&copy; Made by EpikTheme. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopyRightSection;
