import './PastStories.css';
import React, { useState, useEffect } from 'react';
import storiesData from './api'; 

const PastStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStories(storiesData);
    };
    fetchStories();
  }, []);


  
  return (
    <div>
      <h1 className='Heading'>Past Stories</h1>
      <div className="stories-container">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <img id="img" src={story.image} alt={story.title} />
            <div className="story-card-content">
              <h2 id='titles'>{story.title}</h2>
              <p>{story.content}</p>
              <p><em>{story.author} - {story.year}</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastStories;