import React, { useEffect, useState } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import { BookVO } from "../../types/books-vo";
import { CONSTANTS } from "../../constants";

const Bookmark: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookVO[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = CONSTANTS.PAGE_SIZE;

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const data = {
        page: page - 1,
        pageSize: pageSize
      }
      const base64Data = btoa(JSON.stringify(data));
      const response = await fetch(`${process.env.REACT_APP_BOOK_URL}?list=${base64Data}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const result = await response.json();
      if (result.code === 1) {
        setBooks(result.data.content);
        setTotal(result.data.totalElements);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                  <div className="bookmark-item text-center">
                    <img
                      src={book.imageUrl || "/assets/images/comic1.png"}
                      alt={book.title}
                      className="img-fluid"
                    />
                    <h3>{book.title}</h3>
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
