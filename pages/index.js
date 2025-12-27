import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  const handleSearch = async () => {
    if (!name) return;
    setLoading(true);
    const res = await fetch(`/api/stats?username=${name}`);
    const result = await res.json();
    setData(res.ok ? result : null);
    setLoading(false);
  };

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <img src="https://docs.genlayer.com/img/logo.svg" style={{ height: '40px' }} />
      <h1>GenLayer Intel</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Discord Username"
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#111', color: 'white' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        {loading ? 'Scanning...' : 'Scan'}
      </button>

      {data && (
        <div ref={cardRef} style={{ marginTop: '30px', padding: '30px', border: '1px solid #333', borderRadius: '20px', background: '#050505', display: 'inline-block' }}>
          <h2>{data.username}</h2>
          <p>Rank: #{data.rank}</p>
          <p>Level: {data.level}</p>
        </div>
      )}
    </div>
  );
               }
