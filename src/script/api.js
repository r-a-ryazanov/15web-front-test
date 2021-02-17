function getDefinedComics(url, handleComics, handleError){
  fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.status === 404 ? Promise.reject(`Комикс не найден.`): Promise.reject(`Произошла ошибка. Попробуйте позже!`);
  })
  .then((result) => {
    handleComics(result);
  })
  .catch((err) => {
    handleError(err);
  });
}

export default function getComics(numberOfComics, handleComics, handleError){
  if(numberOfComics>0){
    getDefinedComics(`http://xkcd.com/${numberOfComics}/info.0.json`, handleComics, handleError);
  } else{
    getDefinedComics(`http://xkcd.com/info.0.json`, handleComics, handleError);
  }
}