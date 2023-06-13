import React,{useEffect,useState} from 'react'
import {imageUrl,API_KEY} from '../../constants/constants'
import './RowPost.css'
import Youtube from 'react-youtube'
import axios  from '../../constants/axios'

function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlid,seturlId]=useState('')
  const [showPlayer, setShowPlayer] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
   axios.get(props.url).then(response=>{
     setmovies(response.data.results)
   }).catch(err=>{
    // alert('Network Error')
   })
  }, [])
  
  const opts = {
    height: '390',
    width: '648',
    playerVars: {
      autoplay: 1,
       controls: 0, // Disable player controls
    },
  };

  const handleMovie = (id) => {
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          seturlId(response.data.results[0]);
          setShowPlayer(true);
          setTimeout(() => {
            setShowCloseButton(true);
          }, 2000); // closeButton after 2 sec
        } else {
          // if it is a tv series
          axios.get(`tv/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then((newResponse) => {
              if (newResponse.data.results.length !== 0) {
                seturlId(newResponse.data.results[0]);
                setShowPlayer(true);
                setTimeout(() => {
                  setShowCloseButton(true);
                }, 2000); // closeButton after 2 sec
              } else {
                console.log("Video not available");
              }
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  
  const handleClose = () => {
    setShowPlayer(false);
    setShowCloseButton(false);
  };
  return (
    <div className='row'>
      <h2 >{props.title}</h2>
        <div className="posters">
          {movies.map((obj)=> <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${imageUrl+obj.poster_path}`} alt="poster" />)}
        </div>
        {showPlayer && (
          <div className='video-popup2'>
      <Youtube opts={opts} videoId={urlid.key}/>
      {showCloseButton && (
             <button className='close-button2' onClick={() => handleClose()}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="34" height="34" className="close-icon2">
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
             </svg>
           </button>
           
            )}

          </div>
        )}
    </div>
  )
}

export default RowPost
