import React, { useState, useEffect } from 'react';

function useFetcher() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/list/hello');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

function ComponentUsingFetcher() {
  const { data, isLoading, error } = useFetcher();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h3>List: {item.name}</h3>
          <ul>
            {item.tasks.map(task => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Fetcher() {
  return (
    <div className="fetcher-container">
      <h1>Data Fetching Example</h1>
      <ComponentUsingFetcher />
    </div>
  );
}
