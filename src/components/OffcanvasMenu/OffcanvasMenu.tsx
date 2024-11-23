import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Spin } from 'antd';
import { BookVO } from "../../types/books-vo";
import { CONSTANTS } from "../../constants";
import { AuthContext } from "../../AuthContext";

const OffcanvasMenu: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookVO[]>([]);
  const { isLogin, isLoading, setLogin, setUserId } = useContext(AuthContext);

  const fetchBooks = async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    try {
      const data = {
        dataFields: [
          {
            name: 'createTime',
            value: 1,
            operator: 'sort'
          }
        ],
        page: 0,
        pageSize: 4  // Only fetch 4 books
      }
      const base64Data = btoa(JSON.stringify(data));

      if (isLogin) {
        try {
          const authResponse = await fetch(`${process.env.REACT_APP_AUTH_BOOK_URL}?list=${base64Data}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          if (authResponse.status === 401) {
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
            }
            return;
          }

          const result = await authResponse.json();
          if (result.code === 1) {
            setBooks(result.data.content);
          }
        } catch (error) {
          console.error("Error fetching authenticated books:", error);
          throw error;
        }
      } else {
        const response = await fetch(`${process.env.REACT_APP_ANON_BOOK_URL}?list=${base64Data}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const result = await response.json();
        if (result.code === 1) {
          setBooks(result.data.content);
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
      fetchBooks();
    }
  }, [isLoading]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Quick Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body side-menu">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Comic Name"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <Spin spinning={loading}>
          <div className="row">
            {books.map((book) => (
              <div key={book.nanoId} className="col-lg-6 menu-comic">
                <Link to={`/detail?id=${book.nanoId}`}>
                  <img
                    src={book.imageURL || "/assets/images/comic1.png"}
                    alt={book.title}
                    className="img-fluid"
                  />
                </Link>
              </div>
            ))}
          </div>
        </Spin>
        <div className="row pt-5">
          <div className="col-lg-12 text-center">
            <Link to="/list" className="button-primary">
              Browse All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasMenu;
