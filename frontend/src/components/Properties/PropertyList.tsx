import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import { useProperties } from "../../context/PropertiesContext";
import PropertyFormModal from "./PropertyForm";

interface Property {
  _id: string;
  type: string;
  size: string;
  location: string;
  budget: number;
  availability: boolean;
}

const PropertyList = () => {
  const { properties, setProperties, deleteProperty } = useProperties();
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/properties`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [setProperties]);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!isConfirmed) return;

    try {
      await deleteProperty(id);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.location
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesAvailability =
      availabilityFilter === "all" ||
      property.availability.toString() === availabilityFilter;
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search by location..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium mr-2">
            Filter by Availability:
          </label>
          <select
            className="p-2 border rounded"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Size</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Budget</th>
              <th className="py-3 px-6 text-center">Availability</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <tr
                  key={property._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="py-3 px-6">{property.type}</td>
                  <td className="py-3 px-6">{property.size}</td>
                  <td className="py-3 px-6">{property.location}</td>
                  <td className="py-3 px-6">${property.budget}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className={`px-4 py-1 rounded-full text-white ${
                        property.availability ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {property.availability ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="py-3 px-6 flex justify-center space-x-3">
                    <AiFillEdit
                      onClick={() => handleEdit(property)}
                      className="text-green-500 cursor-pointer text-xl hover:scale-110 transition"
                    />
                    <AiFillDelete
                      onClick={() => handleDelete(property._id)}
                      className="text-red-500 cursor-pointer text-xl hover:scale-110 transition"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <PropertyFormModal
          selectedProperty={selectedProperty}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default PropertyList;
