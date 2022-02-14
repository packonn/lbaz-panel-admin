import "./inputVideo.css";

const InputVideo = ({ url, handleVideo, setUrl, videos }) => {
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className='button-wrapper'>
          <span
            className='label'
            onClick={() => {
              if (url !== "") {
                handleVideo();
              }
            }}>
            ajouter le lien
          </span>
        </div>
      </div>
      <div className='previous'>
        {videos.map((e, i) => {
          e.slice(0, 12);
          return (
            <p
              key={i}
              className={
                videos.length > 1 ? "previousVideos dashed" : "previousVideos "
              }>
              {e.slice(0, 40)}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default InputVideo;
