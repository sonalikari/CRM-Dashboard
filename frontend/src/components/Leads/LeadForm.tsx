import { useState, useEffect } from "react";
import { useLeads } from "../../context/LeadsContext";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  documents?: string[]; 
}

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, lead }) => {
  const { addLead, editLead } = useLeads();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setPhone(lead.phone);
    } else {
      setName("");
      setPhone("");
    }
  }, [lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Both fields are required!");
      return;
    }
  
    if (lead && lead._id) {
      editLead({ _id: lead._id, name, phone, documents: lead.documents ?? [] });
    } else {
      addLead({ name, phone, documents: [] }); // Add default empty array
    }
  
    onClose();
  };
  
  

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {lead ? "Edit Lead" : "Add Lead"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {lead ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default LeadForm;
