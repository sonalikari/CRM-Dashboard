import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/leads";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  documents: string[];
}

interface LeadsContextType {
  leads: Lead[];
  fetchLeads: () => void;
  addLead: (lead: Omit<Lead, "_id">) => void;
  editLead: (lead: Lead) => void;
  deleteLead: (id: string) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const fetchLeads = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const addLead = async (lead: Omit<Lead, "_id">) => {
    try {
      const { data } = await axios.post(API_URL, lead);
      setLeads((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  const editLead = async (updatedLead: Lead) => {
    if (!updatedLead._id) {
      console.error("Lead ID is missing, cannot edit.");
      return;
    }
    try {
      const { data } = await axios.put(
        `${API_URL}/${updatedLead._id}`,
        updatedLead
      );
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead._id === updatedLead._id ? data : lead))
      );
    } catch (error) {
      console.error("Error editing lead:", error);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <LeadsContext.Provider
      value={{ leads, fetchLeads, addLead, editLead, deleteLead }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) throw new Error("useLeads must be used within LeadsProvider");
  return context;
};
