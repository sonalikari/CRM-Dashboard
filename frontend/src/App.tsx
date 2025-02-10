import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import LeadsPage from "./pages/LeadsPage";
import PropertiesPage from "./pages/PropertiesPage";
import Dashboard from "./pages/Dashboard";
import { LeadsProvider } from "./context/LeadsContext"; // Ensure LeadsProvider is imported
import { PropertiesProvider } from "./context/PropertiesContext";

function App() {
  return (
    <LeadsProvider> {/* Wrap the entire app with LeadsProvider */}
       <PropertiesProvider>
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <div className="flex-1 p-4 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/properties" element={<PropertiesPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      </PropertiesProvider>
    </LeadsProvider>
  );
}

export default App;
