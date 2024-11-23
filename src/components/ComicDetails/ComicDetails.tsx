import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BookVO } from '../../types/books-vo';
import { ResultBook } from '../../types/result-book';
import { message, Modal, Progress } from 'antd';
import Preloader from '../Preloader/Preloader';
import { AuthContext } from '../../AuthContext';

const ComicDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [book, setBook] = useState<BookVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const downloadFile = async (url: string, filename: string) => {
    try {
      setShowDownloadModal(true);
      setDownloadProgress(0);
      
      const response = await fetch(url);
      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength || '0', 10);
      
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to start download');
      }

      let receivedLength = 0;
      const chunks: Uint8Array[] = [];

      while(true) {
        const {done, value} = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        // Update progress
        const progress = (receivedLength / total) * 100;
        setDownloadProgress(Math.round(progress));
      }

      // Combine all chunks into a single Blob
      const blob = new Blob(chunks);
      const downloadUrl = URL.createObjectURL(blob);
      
      // Create hidden link and trigger download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      
      // Show success message and close modal
      setTimeout(() => {
        setShowDownloadModal(false);
        message.success('Download completed successfully!');
      }, 1000);
      
    } catch (error) {
      console.error('Download error:', error);
      setShowDownloadModal(false);
      message.error('Failed to download the file');
    }
  };

  const handleDownload = async () => {
    if (!isLogin) {
      const modal = document.getElementById('contact-modal');
      if (modal) {
        const bsModal = new (window as any).bootstrap.Modal(modal);
        bsModal.show();
      }
      return;
    }

    const nanoId = searchParams.get('id');
    try {
      const response = await fetch(`${process.env.REACT_APP_AUTH_BOOK_URL}/action/download/${nanoId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const result: ResultBook = await response.json();

      if (result.code === 1 && result.data.downloadURL) {
        // Start actual download with progress tracking
        await downloadFile(
          result.data.downloadURL, 
          `${book?.title || 'comic'}.pdf`
        );
      } else {
        Modal.confirm({
          title: 'Subscription Required',
          content: 'Please purchase a plan to download this comic.',
          okText: 'View Plans',
          cancelText: 'Cancel',
          onOk() {
            navigate('/#price-plan-section');
            window.location.reload();
          }
        });
      }
    } catch (err) {
      setShowDownloadModal(false);
      message.error('Failed to download the comic');
    }
  };

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
              <button 
                className="button-primary" 
                style={{ marginTop: '10px', border: 'none' }}
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Download Progress Modal */}
      <Modal
        title="Downloading Comic"
        open={showDownloadModal}
        footer={null}
        closable={false}
        maskClosable={false}
      >
        <div style={{ textAlign: 'center' }}>
          <Progress percent={downloadProgress} />
          <p style={{ marginTop: '1rem' }}>
            Downloading... Please don't close this window.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ComicDetails;
