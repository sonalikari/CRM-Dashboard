import { useState } from "react";
import LeadList from "../components/Leads/LeadList";
import LeadForm from "../components/Leads/LeadForm";

interface Lead {   
  _id: string;
  name: string;
  phone: string;
  documents?: string[];
}

const LeadsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const openModal = (lead: Lead | null = null) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leads Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          onClick={() => openModal(null)}
        >
          + Add Lead
        </button>
      </div>

      <LeadList onEdit={openModal} />
      <LeadForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLead(null);
        }}
        lead={editingLead}
      />
    </div>
  );
};

export default LeadsPage;
