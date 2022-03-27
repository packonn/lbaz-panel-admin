import "./inputVideo.css";

const InputVideo = ({ setVideos, videos, required }) => {
  return (
    <div className="containerFiles">
      <div className="title">
        <p>Lien vers vidéos Youtube *</p>
      </div>
      <div className="containerInput">
        <input
          required={required}
          type="text"
          name="lien"
          placeholder="Copier l'URL de la vidéo"
          id="uploadVideo"
          value={videos}
          onChange={(e) => setVideos(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputVideo;
