import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatFact = () => {
  const [fact, setFact] = useState('Fetching a cat fact...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await axios.get('https://catfact.ninja/fact');
        setFact(response.data.fact);
        setLoading(false);
      } catch (error) {
        setFact('Error fetching fact');
        setLoading(false);
      }
    };

    fetchFact();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cat Fact</h1>
      <p>{fact}</p>
    </div>
  );
};

export default CatFact;
