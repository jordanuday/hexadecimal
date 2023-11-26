import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure the CSS file is correctly linked

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]); // To store original user data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setOriginalData(data); // Store original data for search
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?searchText=${searchText}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const resetSearch = () => {
    setSearchText('');
    setUsers(originalData);
  };

  return (
    <div className="App">
      <h1>User Data</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>
      <table>
        {/* Table headers and user data rendering remains the same */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((filteredUser) => (
              <tr key={filteredUser.id}>
                <td>{filteredUser.name}</td>
                <td>{filteredUser.email}</td>
                <td>{filteredUser.phone}</td>
                <td>{filteredUser.website}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
