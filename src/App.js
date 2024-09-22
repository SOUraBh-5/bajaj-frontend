import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const jsonData = JSON.parse(inputData);
            console.log('Sending data to backend:', jsonData);
            const result = await axios.post('https://bajaj-backend-eluo.onrender.com/bfhl', jsonData);
            console.log('Received response from backend:', result.data);
            setResponse(result.data);
        } catch (err) {
            console.error(err);
            setError('Invalid JSON format or request failed');
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedOptions((prev) => [...prev, value]);
        } else {
            setSelectedOptions((prev) => prev.filter(option => option !== value));
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        const output = {};

        if (selectedOptions.includes('Numbers')) {
            output.numbers = numbers.length > 0 ? numbers : "No numbers found";
        }
        if (selectedOptions.includes('Alphabets')) {
            output.alphabets = alphabets.length > 0 ? alphabets : "No alphabets found";
        }
        if (selectedOptions.includes('Highest Lowercase Alphabet')) {
            output.highest_lowercase_alphabet = highest_lowercase_alphabet.length > 0 ? highest_lowercase_alphabet : "No lowercase alphabets found";
        }

        return (
            <div className="response">
                <h2>Response:</h2>
                <pre>{JSON.stringify(output, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div>
            <h1>RA2111033010150</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Enter JSON data here...'
                />
                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <div className="filter-container">
                <h3>Select Filters:</h3>
                <label>
                    <input
                        type="checkbox"
                        value="Alphabets"
                        onChange={handleCheckboxChange}
                    />
                    Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Numbers"
                        onChange={handleCheckboxChange}
                    />
                    Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Highest Lowercase Alphabet"
                        onChange={handleCheckboxChange}
                    />
                    Highest Lowercase Alphabet
                </label>
            </div>

            {renderResponse()}
        </div>
    );
};

export default App;
