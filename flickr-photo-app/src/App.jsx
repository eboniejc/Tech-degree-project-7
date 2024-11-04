import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import Nav from './components/Nav';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
import apiKey from './config';
import NotFound from './components/NotFound';
import Loader from './components/Loader';

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  //Grab API
  const fetchData = async (query) => {
    setLoading(true);
    try {
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.photos && data.photos.photo) {
        setPhotos(data.photos.photo);
      } else {
        setPhotos([]);
      }

      // Test loading function
      // setTimeout(() => {
      //   setLoading(false); 
      // }, 9000); 

    } catch (error) {
      console.error("Error fetching data.", error);
      setPhotos([]);
    }
    setLoading(false);
  };

  // Trigger fetchData whenever the path changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/cats') {
      fetchData('cats');
    } else if (path === '/dogs') {
      fetchData('dogs');
    } else if (path === '/computers') {
      fetchData('computers');
    } else if (path.startsWith('/search/')) {
      const query = path.replace('/search/', '');
      fetchData(query);
    }

  }, [location.pathname]); 
 
//Routes
  return (
    <div className="App">
      <Search onSearch={fetchData} />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/cats" />} />
        <Route path="/cats" element={<PhotoList title="Cats" photos={photos} loading={loading} />} />
        <Route path="/dogs" element={<PhotoList title="Dogs" photos={photos} loading={loading} />} />
        <Route path="/computers" element={<PhotoList title="Computers" photos={photos} loading={loading} />} />
        <Route path="/search/:query" element={<SearchResults fetchData={fetchData} photos={photos} loading={loading} />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

function SearchResults({ photos, loading }) {
  const { query } = useParams();

  return (
    <>
      {loading ? (
        <Loader /> //Exceeds expectations - DNA Loader
      ) : (
        <PhotoList title={`Results for "${query}"`} photos={photos} />
      )}
    </>
  );
}

export default App;
