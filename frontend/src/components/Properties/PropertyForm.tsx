import { useState, useEffect } from "react";
import { useProperties } from "../../context/PropertiesContext";

interface PropertyFormModalProps {
  selectedProperty: any | null;
  setIsModalOpen: (isOpen: boolean) => void;
}

const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  selectedProperty,
  setIsModalOpen,
}) => {
  const { addProperty, updateProperty, refreshProperties } = useProperties();
  const [formData, setFormData] = useState({
    type: "Residential",
    size: "",
    location: "",
    budget: "",
    availability: true,
  });

  useEffect(() => {
    if (selectedProperty) {
      setFormData(selectedProperty);
    }
  }, [selectedProperty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProperty) {
      updateProperty({ ...formData, id: selectedProperty.id });
    } else {
      addProperty({ ...formData, id: Date.now() });
    }
    refreshProperties();
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-4">
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {selectedProperty ? "Edit Property" : "Add Property"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-medium text-gray-700">
            Property Type:
          </label>
          <select
            className="w-full p-2 border rounded"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>

          <input
            type="text"
            placeholder="Size (e.g., 2000 sq ft)"
            className="w-full p-2 border rounded"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full p-2 border rounded"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Budget"
            className="w-full p-2 border rounded"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
          />

          {/* Availability Dropdown */}
          <label className="block font-medium text-gray-700">
            Availability:
          </label>
          <select
            className="w-full p-2 border rounded"
            value={formData.availability.toString()}
            onChange={(e) =>
              setFormData({
                ...formData,
                availability: e.target.value === "true",
              })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {selectedProperty ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFormModal;
