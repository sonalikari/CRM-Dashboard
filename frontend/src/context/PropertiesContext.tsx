import { createContext, useContext, useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/properties";

interface Property {
  _id: string;
  type: string;
  size: string;
  location: string;
  budget: number;
  availability: boolean;
}

interface PropertiesContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, "_id">) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  refreshProperties: () => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(
  undefined
);

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const addProperty = async (property: Omit<Property, "_id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      const newProperty = await response.json();
      setProperties([...properties, newProperty]);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const updateProperty = async (property: Property) => {
    try {
      await fetch(`${API_URL}/${property._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      fetchProperties();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        refreshProperties: fetchProperties,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context)
    throw new Error("useProperties must be used within a PropertiesProvider");
  return context;
};
