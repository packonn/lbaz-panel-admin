import { toast } from "react-toastify";

export const api = "http://localhost:3100/";
// export const api = "https://lbaz.herokuapp.com/";
// export const api = "http://localhost:3000/";

export const optionNotify = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export const notify = (type, text, optionNotify) => {
  toast[type](text, optionNotify);
};

export const verifFormatMusic = (numberFiles, e) => {
  // Vérification du format du fichier reçu
  const tab = [];
  let response = true;
  for (let i = 0; i < numberFiles; i++) {
    tab.push(e[i]);
  }
  for (let i = 0; i < numberFiles; i++) {
    if (!tab[i].type.includes("audio/mpeg")) {
      response = false;
    }
  }
  return response;
};

export const deleteExtensionFile = (fileName) => {
  // Permet de récupérer le nom du fichier pour le mettre en nom de chanson, en supprimant l'extension
  return fileName.split(".").shift();
};

export const sortMusic = (musicTab) => {
  if (musicTab.length !== 0) {
    // Trie les musiques
    return musicTab.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else {
    return [];
  }
};

export const deleteAndSortDoublon = (arr) => {
  const uniqueValuesSet = new Set();

  const arrMusicFiltered = arr.filter((obj) => {
    const isPresentInSet = uniqueValuesSet.has(obj.name);
    uniqueValuesSet.add(obj.name);
    return !isPresentInSet;
  });
  return sortMusic(arrMusicFiltered);
};

// export const deleteAndSortDoublonForUpdate = (oldMusic, newMusic) => {
//   //Vérifie que la nouvelle musique n'est pas deja présente dans le tableau des musique deja enregistré
//   const newTabWithOnlyNoDoublon = [];
//   for (let i = 0; i < oldMusic.length; i++) {
//     for (let y = 0; i < newMusic.length; y++) {
//       // if(oldMusic[i]===newMusic[y]){
//       console.log(oldMusic[i].name, newMusic[y].name);
//       // }
//     }
//   }
// };
