import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // If no token, redirect to login
      toast.error("Please log in first.");
      navigate("/login");
    }
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/api/v1/auth/users/");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/api/v1/auth/users/upload-users/",
        formData
      );

      // Check for successful response
      if (response.status === 200) {
        toast.success("File uploaded successfully");
        // Fetch the updated list of students
        fetchStudents();
      } else {
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error(error?.response?.data?.errors[0]?.detail);
    }
  };

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Paginate data
  const paginatedStudents = Array.isArray(students)
    ? students.slice(
        currentPage * studentsPerPage,
        (currentPage + 1) * studentsPerPage
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center justify-center pt-3 pb-8 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload CSV</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />
          <button
            onClick={handleUpload}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Eligible Voters</h2>
        {loading ? (
          <div className="text-center">Loading students...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2 border">Phone Number</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Department Code</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Matric Number</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Middle Name</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <tr key={student.matric_no}>
                      <td className="px-4 py-2 border">{student.phone}</td>
                      <td className="px-4 py-2 border">{student.email}</td>
                      <td className="px-4 py-2 border">
                        {student.department_name}
                      </td>
                      <td className="px-4 py-2 border">{student.lastname}</td>
                      <td className="px-4 py-2 border">{student.matric_no}</td>
                      <td className="px-4 py-2 border">{student.firstname}</td>
                      <td className="px-4 py-2 border">
                        {student.middle_name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No students uploaded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="my-4">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(students.length / studentsPerPage)}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center mt-4"}
                pageClassName={"mx-1"}
                activeClassName={"bg-gray-300"}
                pageLinkClassName={"px-3 py-1 border rounded-md"}
                previousLinkClassName={"px-3 py-1 border rounded-md"}
                nextLinkClassName={"px-3 py-1 border rounded-md"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
