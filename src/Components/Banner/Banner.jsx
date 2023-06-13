import React, { useEffect } from 'react';
import { API_KEY, imageUrl } from '../../constants/constants';
import axios from '../../constants/axios';
import Youtube from 'react-youtube';

import './Banner.css';
import { useState } from 'react';

function Banner() {
  const [movie, setMovie] = useState();
  const [urlId, setUrlId] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 20);
      axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
        // console.log(response.data.results[randomIndex]);
        setMovie(response.data.results[randomIndex]);
      });
    }, 5000); // change in 5 sec
    return () => clearInterval(interval);
  }, []);

  const getTitle = () => {
    if (movie && movie.title) {
      return movie.title;
    }
    return 'Movie';
  };

  const opts = {
    height: '418',
    width: '648',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0].key);
        setShowPlayer(true);
        setTimeout(() => {
          setShowCloseButton(true);
        }, 2000); // closeButton after 2 sec
      } else {
        console.log('Video not available');
      }
    });
  };

  const handleClose = () => {
    setShowPlayer(false);
    setShowCloseButton(false);
  };

  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }} className={`banner ${movie ? 'show' : 'hide'}`}>
      <div className='content'>
        <div className='banner_buttons'>
        <h1 className={`title ${movie ? 'show' : 'hide'}`}>{getTitle()}</h1>

          <button onClick={() => handleMovie(movie.id)} className='button'>
            play
          </button>
          <button className='button'>my list</button>
        </div>
        {showPlayer && (
          <div className='video-popup'>
            <Youtube opts={opts} videoId={urlId} />
            {showCloseButton && (
             <button className='close-button' onClick={() => handleClose()}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="34" height="34" className="close-icon">
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
             </svg>
           </button>
           
           
            )}
          </div>
        )}
        <h1 className={`description ${movie ? 'show' : 'hide'}`}>{movie ? movie.overview : ''}</h1>
      </div>
      <div className='fade_bottom'></div>
    </div>
  );
}

export default Banner;
