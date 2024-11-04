import React from 'react';

const Photo = ({ photo }) => {
  if (!photo) {
    return null;
  }
//api URL
  const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;

  return (
    <li>
      <img src={url} alt={photo.title || "Flickr Photo"} />
    </li>
  );
};

export default Photo;
