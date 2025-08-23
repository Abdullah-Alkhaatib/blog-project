import "./admin.css"
import AdminSidebar from "./AdminSidebar"
import AdminMain from "./AdminMain"

export default function AdminDashBoard(){
    return(
        <div>
            <section className="admin-dashboard">
                <AdminSidebar />
                <AdminMain />
            </section>
        </div>
    )
}