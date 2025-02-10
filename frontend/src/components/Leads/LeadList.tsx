import { useState, useEffect } from "react";
import { useLeads } from "../../context/LeadsContext";
import ReactPaginate from "react-paginate";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUpload,
  FaDownload,
  FaSyncAlt,
} from "react-icons/fa";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  documents?: string[];
}

interface LeadListProps {
  onEdit: (lead: Lead | null) => void;
}

const API_BASE_URL = "http://localhost:5000/api/leads";

const LeadList: React.FC<LeadListProps> = ({ onEdit }) => {
  const { leads, deleteLead, fetchLeads } = useLeads();
  const [search, setSearch] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fileMap: { [key: string]: string } = {};
    leads.forEach((lead) => {
      if (lead.documents && lead.documents.length > 0) {
        fileMap[lead._id] = `${API_BASE_URL}/uploads/${lead.documents[0]}`;
      }
    });
    setUploadedFiles(fileMap);
  }, [leads]);

  const [currentPage, setCurrentPage] = useState(0);
  const leadsPerPage = 5;
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search)
  );

  const pageCount = Math.ceil(filteredLeads.length / leadsPerPage);
  const displayedLeads = filteredLeads.slice(
    currentPage * leadsPerPage,
    (currentPage + 1) * leadsPerPage
  );

  // Handle File Upload
  const handleFileUpload = async (
    leadId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert(
        "❌ Invalid file type! Only JPEG, PNG, PDF, and DOCX files are allowed."
      );
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(`${API_BASE_URL}/${leadId}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.lead?.documents?.length > 0) {
        setUploadedFiles((prev) => ({
          ...prev,
          [leadId]: data.lead.documents[data.lead.documents.length - 1],
        }));
        alert(`📄 Successfully uploaded: ${file.name}`);
        fetchLeads();
      } else {
        alert("❌ Upload failed: No document returned.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ Error uploading file");
    }
  };

  // Handle Download
  const handleDownloadDocument = async (leadId: string, docIndex: number) => {
    try {
      console.log(`Downloading: Lead ID=${leadId}, docIndex=${docIndex}`);

      const response = await fetch(
        `${API_BASE_URL}/${leadId}/download/${docIndex}`
      );
      console.log("API Response:", response);

      const data = await response.json();
      console.log("Download URL:", data.downloadUrl);

      if (!response.ok || !data.downloadUrl) {
        throw new Error("Download URL not found");
      }

      window.open(data.downloadUrl, "_blank");
    } catch (error) {
      console.error("Download Error:", error);
      alert("❌ Error downloading document");
    }
  };

  const handleEdit = (lead: Lead) => {
    onEdit(lead);
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      deleteLead(leadId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name or phone..."
          className="w-full pl-10 pr-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-4 text-gray-500" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 border text-left">Name</th>
              <th className="p-4 border text-left">Phone</th>
              <th className="p-4 border text-center">Documents</th>
              <th className="p-4 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.length > 0 ? (
              displayedLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border hover:bg-gray-100 transition"
                >
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.phone}</td>

                  <td className="p-4 text-center">
                    {uploadedFiles[lead._id] ? (
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleDownloadDocument(lead._id, 0)}
                          className="text-green-600 hover:text-green-800 transition flex items-center gap-1"
                        >
                          <FaDownload size={18} /> Download
                        </button>

                        <label className="cursor-pointer text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                          <FaSyncAlt size={18} /> Replace
                          <input
                            type="file"
                            accept="image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="hidden"
                            onChange={(e) => handleFileUpload(lead._id, e)}
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="cursor-pointer text-blue-600 hover:text-blue-800 transition inline-flex items-center">
                        <FaUpload size={18} />
                        <input
                          type="file"
                          accept="image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={(e) => handleFileUpload(lead._id, e)}
                        />
                      </label>
                    )}
                  </td>

                  <td className="p-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(lead)}
                      className="text-green-600 hover:text-green-800 transition transform hover:scale-110"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <ReactPaginate
        previousLabel={"←prev"}
        nextLabel={"→next"}
        pageCount={pageCount}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={"flex justify-center mt-4 space-x-2"}
        pageLinkClassName={
          "px-3 py-1 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white transition"
        }
        previousLinkClassName={"px-3 py-1 bg-gray-300 rounded-md"}
        nextLinkClassName={"px-3 py-1 bg-gray-300 rounded-md"}
        activeClassName={"bg-blue-500 text-white"}
      />
    </div>
  );
};

export default LeadList;
