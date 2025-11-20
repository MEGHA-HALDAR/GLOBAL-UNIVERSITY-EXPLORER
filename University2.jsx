import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

const University2 = () => {
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  // Fetch university data based on selected country
  const fetchUniversities = async (selectedCountry = "India") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?country=${selectedCountry}`
      );
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchUniversities(country);
  }, [country]);

  // Filter universities based on search text
  const filteredUniversities = universities.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // DataTable columns
  const columns = [
    {
      name: "University Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "State / Province",
      selector: (row) => row["state-province"] || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Website",
      selector: (row) => (
        <a
          href={row.web_pages[0]}
          target="_blank"
          rel="noreferrer"
          className="text-primary text-decoration-none fw-semibold"
        >
          Visit Site
        </a>
      ),
      center: true,
    },
  ];

  return (
    <div className="container my-5 p-4 border rounded-4 shadow-lg bg-light">
      <h2 className="text-center mb-4 text-primary fw-bold">
        🎓 Global University Explorer
      </h2>

      <div className="row mb-4">
        {/* Country Dropdown */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Select Country:</label>
          <select
            className="form-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Search by Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type university name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 fw-semibold text-secondary">
            Fetching universities for {country}...
          </p>
        </div>
      ) : filteredUniversities.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredUniversities}
          pagination
          highlightOnHover
          striped
          dense
          responsive
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
        />
      ) : (
        <p className="text-center text-danger fw-semibold mt-4">
          No universities found for your search.
        </p>
      )}
    </div>
  );
};

export default University2;
