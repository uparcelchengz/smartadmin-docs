import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './styles.css';

interface PDFFlipBookProps {
  file: string;
  title?: string;
  width?: number;
}

const PDFFlipBookContent: React.FC<PDFFlipBookProps> = ({ 
  file, 
  title,
  width = 800 
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamically import react-pdf only in browser
  const [Document, setDocument] = useState<any>(null);
  const [Page, setPage] = useState<any>(null);

  React.useEffect(() => {
    import('react-pdf').then((module) => {
      const { Document: Doc, Page: Pg, pdfjs } = module;
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      setDocument(() => Doc);
      setPage(() => Pg);
    });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError('Failed to load PDF. Please check the file path.');
    setIsLoading(false);
    console.error('PDF load error:', error);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1));
  };

  const goToFirstPage = () => {
    setPageNumber(1);
  };

  const goToLastPage = () => {
    setPageNumber(numPages);
  };

  return (
    <div className="pdf-flipbook-container">
      {title && <h3 className="pdf-title">{title}</h3>}
      
      {/* View and Download Buttons */}
      <div className="pdf-action-buttons">
        <a 
          href={file} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pdf-action-btn pdf-view-btn"
        >
          👁️ View in Browser
        </a>
        <a 
          href={file} 
          download
          className="pdf-action-btn pdf-download-btn"
        >
          📥 Download PDF
        </a>
      </div>
      
      <div className="pdf-viewer">
        {!Document || !Page ? (
          <div className="pdf-loading">
            <div className="loading-spinner"></div>
            <p>Loading PDF viewer...</p>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Loading PDF...</p>
              </div>
            )}
            
            {error && (
              <div className="pdf-error">
                <p>⚠️ {error}</p>
              </div>
            )}
            
            {!error && (
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading=""
              >
                <Page 
                  pageNumber={pageNumber}
                  width={width}
                  className="pdf-page"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={<div className="page-loading">Loading page...</div>}
                />
              </Document>
            )}
          </>
        )}
      </div>

      {!error && numPages > 0 && Document && Page && (
        <div className="pdf-controls">
          <div className="pdf-nav-buttons">
            <button 
              onClick={goToFirstPage} 
              disabled={pageNumber <= 1}
              className="pdf-nav-button"
              title="First page"
            >
              ⏮
            </button>
            <button 
              onClick={goToPrevPage} 
              disabled={pageNumber <= 1}
              className="pdf-nav-button"
            >
              ◀ Previous
            </button>
            <span className="pdf-page-info">
              Page {pageNumber} of {numPages}
            </span>
            <button 
              onClick={goToNextPage} 
              disabled={pageNumber >= numPages}
              className="pdf-nav-button"
            >
              Next ▶
            </button>
            <button 
              onClick={goToLastPage} 
              disabled={pageNumber >= numPages}
              className="pdf-nav-button"
              title="Last page"
            >
              ⏭
            </button>
          </div>
          
          <div className="pdf-page-input">
            <label htmlFor="pageInput">Go to page:</label>
            <input
              id="pageInput"
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= numPages) {
                  setPageNumber(page);
                }
              }}
              className="page-input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const PDFFlipBook: React.FC<PDFFlipBookProps> = (props) => {
  return (
    <BrowserOnly fallback={<div className="pdf-loading">Loading PDF viewer...</div>}>
      {() => <PDFFlipBookContent {...props} />}
    </BrowserOnly>
  );
};

export default PDFFlipBook;
