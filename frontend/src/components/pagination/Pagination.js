// ترقيم الصفحات
import "./pagination.css"

export default function Pagination() {
    return (
        <div className="pagination">
            <div className="page previous">Previous</div>
                {[1,2,3,4,5].map(page => (
                    <div key={page} className="page">
                        {page}
                    </div>
                ))}
            <div className="page next">Next</div>
        </div>
    );
}
