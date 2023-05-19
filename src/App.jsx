import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    if (country) {
      fetch(`http://universities.hipolabs.com/search?country=${country}`)
        .then(response => response.json())
        .then(data => setUniversities(data))
        .catch(error => console.log(error));
    }
  }, [country]);

  const handleCountryChange = event => {
    setCountry(event.target.value);
  };

  const handleSearch = () => {
    if (country) {
      fetch(`http://universities.hipolabs.com/search?country=${country}`)
        .then(response => response.json())
        .then(data => setUniversities(data))
        .catch(error => console.log(error));
    }
  };

  const handleClear = () => {
    setCountry('');
    setUniversities([]);
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
          type="text" placeholder='      Enter a Country'
          value={country}
          onChange={handleCountryChange}
        />
        <button className="button" onClick={handleSearch}  style={{ marginRight: '5px' }}>Search</button>
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
                <strong>Web Page:</strong> <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a><br />
                <strong>Domain:</strong> <a href={university.domains[0]} target="_blank" rel="noopener noreferrer">{university.domains[0]}</a>
              </p>
            </div>
          ))}
        </>
      ) : (
        <p style={{fontWeight:700, fontSize: "20px"}}>No universities found for the selected country.</p>
      )}
    </div>
  );
};

export default App;
