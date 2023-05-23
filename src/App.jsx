import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country) {
      fetchUniversities(country);
    }
  }, [country]);

  const fetchUniversities = async (country) => {
    try {
      const response = await fetch(`https://universitiesapi.onrender.com/v1/api/universities/${country}`);
      if (!response.ok) {
        throw new Error('Failed to fetch universities');
      }
      const data = await response.json();
      setUniversities(data);
      setError(null);
    } catch (error) {
      setUniversities([]);
      setError('Failed to fetch universities. Please try again.');
    }
  };

  const handleCountryChange = event => {
    setCountry(event.target.value);
  };

  const handleSearch = () => {
    if (country) {
      fetchUniversities(country);
    }
  };

  const handleClear = () => {
    setCountry('');
    setUniversities([]);
    setError(null);
  };

  return (
    <div className="container">
      <h1>University Finder</h1>
      <div className="form-group">
        <label className="label" htmlFor="country">
          <h4>Select Country:</h4>
        </label>
        <input
          id="country"
          className="input"
          type="text"
          placeholder="Enter a Country"
          value={country}
          onChange={handleCountryChange}
        />
        <button className="button" onClick={handleSearch} style={{ marginRight: '5px' }}>Search</button>
        <button className="button" onClick={handleClear}>Clear</button>
      </div>
      {universities.length > 0 ? (
        <>
          <h2>Universities in {country}:</h2>
          {universities.map(university => (
            <div className="university-card" key={university.name}>
              <h3 className="university-name">{university.name}</h3>
              <p className="university-info">
                <strong>Country:</strong> {university.country}<br />
                <strong>Web Page:</strong> {university.web_pages && university.web_pages[0] ? (
                  <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a>
                ) : (
                  'N/A'
                )}<br />
                <strong>Domain:</strong> {university.domains && university.domains[0] ? (
                  <a href={university.domains[0]} target="_blank" rel="noopener noreferrer">{university.domains[0]}</a>
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p style={{ fontWeight: 700, fontSize: "20px" }}>
          {error ? error : 'No universities found for the selected country.'}
        </p>
      )}
    </div>
  );
};

export default App;
