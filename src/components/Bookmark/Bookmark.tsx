import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BookVO } from "../../types/books-vo";
import { CONSTANTS } from "../../constants";
import { AuthContext } from "../../AuthContext";

const Bookmark: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookVO[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = CONSTANTS.PAGE_SIZE;
  const { isLogin, userId, isLoading, setLogin, setUserId } = useContext(AuthContext);

  const fetchBooks = async (page: number) => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    try {
      const data = {
        page: page - 1,
        pageSize: pageSize
      }
      console.log('is login', isLogin);
      const base64Data = btoa(JSON.stringify(data));

      // first use auth url
      if (isLogin) {
        try {
          const authResponse = await fetch(`${process.env.REACT_APP_AUTH_BOOK_URL}?list=${base64Data}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          // if return 401, then use anonymous url and set login state to false
          if (authResponse.status === 401) {
            console.log('Auth failed, trying anonymous endpoint');
            // Set login state to false and clear userId
            setLogin(false);
            setUserId(null);

            const anonResponse = await fetch(`${process.env.REACT_APP_ANON_BOOK_URL}?list=${base64Data}`, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
            const result = await anonResponse.json();
            if (result.code === 1) {
              setBooks(result.data.content);
              setTotal(result.data.totalElements);
            }
            return;
          }

          const result = await authResponse.json();
          if (result.code === 1) {
            setBooks(result.data.content);
            setTotal(result.data.totalElements);
          }
        } catch (error) {
          console.error("Error fetching authenticated books:", error);
          throw error;
        }
      } else {
        // if not login, then use anonymous url
        const response = await fetch(`${process.env.REACT_APP_ANON_BOOK_URL}?list=${base64Data}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const result = await response.json();
        if (result.code === 1) {
          setBooks(result.data.content);
          setTotal(result.data.totalElements);
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      console.log('Auth state loaded:', { isLogin, userId });
      fetchBooks(currentPage);
    }
  }, [currentPage, isLogin, isLoading]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/detail?id=${bookId}`);
  };

  return (
    <div className="inner-page">
      {/* Bookmark Section */}
      <section id="page-title">
        <div id="backtotop">
          <a href="#page-title" id="backtotop-value">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="section-title">
              <div className="row">
                <div className="col-lg-6">
                  <span>Bookmark</span>
                  <h3>Your Favourite Comic Books.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bookmark Items */}
      <section id="bookmark">
        <div className="container">
          <Spin spinning={loading}>
            <Row gutter={[24, 24]}>
              {books.map((book) => (
                <Col key={book.nanoId} xs={24} sm={12} md={8} lg={6}>
                  <div
                    className="bookmark-item text-center"
                    onClick={() => handleBookClick(book.nanoId)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={book.imageURL || "/assets/images/comic1.png"}
                      alt={book.title}
                      style={{ width: '306px', height: '383px', objectFit: 'contain', background: 'black' }}
                      className="img-fluid"
                    />
                    <h3>{book.title.length > 50 ? `${book.title.substring(0, 50)}...` : book.title}</h3>
                  </div>
                </Col>
              ))}
            </Row>
            {total > 0 && (
              <Row justify="center" style={{ marginTop: '2rem' }}>
                <Pagination
                  current={currentPage}
                  total={total}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </Row>
            )}
          </Spin>
        </div>
      </section>
    </div>
  );
};

export default Bookmark;
