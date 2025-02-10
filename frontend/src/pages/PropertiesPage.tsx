import { useState } from "react";
import PropertyFormModal from "../components/Properties/PropertyForm";
import PropertyList from "../components/Properties/PropertyList";

const PropertiesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (property: any | null = null) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Management</h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          + Add Property
        </button>
      </div>

      <PropertyList setSelectedProperty={handleOpenModal} />
      {isModalOpen && (
        <PropertyFormModal
          selectedProperty={selectedProperty}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default PropertiesPage;
