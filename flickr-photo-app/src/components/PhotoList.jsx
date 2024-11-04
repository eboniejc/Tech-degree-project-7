import React from 'react';
import Photo from './Photo';

const PhotoList = ({ photos, title }) => (
  <div className="photo-container">
    <h2>{title}</h2>
    {photos && photos.length > 0 ? ( //Exceeds Expectations for matches should return not found
      <ul>
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} />
        ))}
      </ul>
    ) : (
      <p>No Matches Found</p>
    )}
  </div>
);

export default PhotoList;
