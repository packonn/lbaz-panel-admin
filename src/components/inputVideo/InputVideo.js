import "./inputVideo.css";

const InputVideo = ({ setVideos, videos }) => {
  return (
    <div className='containerFiles'>
      <div className='title'>
        <p>Videos</p>
      </div>
      <div className='containerInput'>
        <input
          type='text'
          name='lien'
          placeholder="Copier l'URL de la vidéo"
          id='uploadVideo'
          value={videos}
          onChange={(e) => setVideos(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputVideo;
