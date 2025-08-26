// ترقيم الصفحات
import "./pagination.css"

export default function Pagination({ pages, currentPage, setCurrentPage }) {

    const generatedPages = [];
    for(let i =1; i <= pages; i++){
        generatedPages.push(i);
    }

    return (
        <div className="pagination">
            <button 
            className="page previous"
            onClick={() => setCurrentPage(current => current - 1)}
            disabled={currentPage === 1}
            >
                Previous
            </button>
                {generatedPages.map(page => (
                    <div 
                    onClick={() => setCurrentPage(page)} 
                    key={page} 
                    className={currentPage === page ? "active page" : "page"}
                    >
                        {page}
                    </div>
                ))}
            <button 
            className="page next"
            onClick={() => setCurrentPage(current => current + 1)}
            disabled={currentPage === pages}
            >
                Next
            </button>
        </div>
    );
}
