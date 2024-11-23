import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookVO } from '../../types/books-vo';
import { ResultBook } from '../../types/result-book';
import { message } from 'antd';
import Preloader from '../Preloader/Preloader';

const ComicDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [book, setBook] = useState<BookVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      const nanoId = searchParams.get('id');
      if (!nanoId) {
        setError('Book ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_ANON_BOOK_URL}/nanoId/${nanoId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const result: ResultBook = await response.json();
        if (result.code !== 1) {
          message.error(result.error?.message || 'Failed to fetch book details');
        }
        setBook(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [searchParams]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Page Title Section */}
      <section id="page-title">
        <div id="backtotop">
          <a href="#page-title" id="backtotop-value">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </section>

      {/* Comic Details Section */}
      <section id="comic-details">
        <div className="container zindex">
          <div className="row details-pos">
            <div className="col-lg-5 comic-detail-img">
              <img
                src={book?.imageURL || "/assets/images/comic1.png"}
                alt="comic-img"
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6 comic-detail-txt">
              <h4>{book?.title || "Loading..."}</h4>
              <span>Storyline</span>
              <p>{book?.description || "No description available"}</p>
              <button className="button-primary" style={{ marginTop: '10px', border: 'none' }}>Download</button>
              {/* <a href="cart.html" className="button-primary">Download</a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComicDetails;
