const InputDateTime = ({ onChange }) => {
  const currentDay = () => {
    // renvoie le jour actuel
    return new Date().toISOString().slice(0, 16);
  };

  const nextDay = () => {
    // Renvoie 4 ans après
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 365 * 4);
    console.log("tomorrow", tomorrow);
    return tomorrow.toISOString().slice(0, 16);
  };

  return (
    <input
      type='datetime-local'
      name='date'
      id='inputDate'
      min={currentDay()}
      max={nextDay()}
      onChange={(e) => {
        onChange(e.target.value);
        console.log(e.target.value);
      }}
    />
  );
};

export default InputDateTime;
