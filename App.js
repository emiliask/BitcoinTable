import React from "react";
import {useEffect, useState} from "react";
import './App.css';

function App() {

  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2")
      .then(res => res.json())
      .then((data) => {
        setDataTable(data.Data.Data)
      setLoading(false)
      })
      .catch(error => setError(true))
  }, []);
  
  console.log(dataTable)

  if (error) {
  return (
    <h1>Error</h1>
  )
  }

  if (loading) {
    return(
      <h1>Loading...</h1>
    )
    }
  return (
    <div>
    <h1>Bitcoin Price Index</h1>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
        </tr>
      </thead>
      <tbody>
        {dataTable.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                  .map((data, index) => {
          return (
            <tr key={index}>
              <td>{new Date(data.time * 1000).toLocaleDateString()}</td>
              <td>{data.open}</td>
              <td>{data.high}</td>
              <td>{data.low}</td>
              <td>{data.close}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
     <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
    <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  );
  
}


      export default App;
