import { TailSpin } from "react-loader-spinner";
import { colors } from "../../colors";

import "./isLoading.css";

const IsLoading = () => {
  return (
    <div className='loading'>
      <TailSpin
        heigth='100'
        width='100'
        color={colors.violetClair}
        ariaLabel='loading'
      />
      <span>Veuillez patienter</span>
    </div>
  );
};

export default IsLoading;
