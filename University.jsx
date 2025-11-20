import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";

const University = () => {
    const [universities, setUniversities] = useState([]);
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('India')


    // Handle input event
    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    const handleCountryChange = (event) => {
        setSearch(event.target.value);
    }

    // Fetch university data from API
    const fetchUniversities = async () => {
        try {
            const response = await axios.get("http://universities.hipolabs.com/search?country=India");
            setUniversities(response.data);
            console.log("Fetched Universities:", response.data);
        } catch (error) {
            console.log("Error fetching universities:", error);
        }
    };


    useEffect(() => {
        fetchUniversities();
    }, []);

    // Filter data by name as user types
    const filteredUniversities = universities.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    // Table columns
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "State/Province",
            selector: (row) => row["state-province"] || "N/A",
            sortable: true,
        },
        {
            name: "Website",
            selector: (row) => (
                <a href={row.web_pages[0]} target="_blank" rel="noreferrer">
                    {row.web_pages[0]}
                </a>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2>🎓 University List (India)</h2>

            <div className="form-group mb-3">
                <label>Search by Name:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type to search..."
                    value={search}
                    onChange={handleChange}
                />
            </div>

            {filteredUniversities.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={filteredUniversities}
                    pagination
                    highlightOnHover
                    striped
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                />
            ) : (
                <p>No universities found.</p>
            )}
        </div>
    );
};

export default University;
