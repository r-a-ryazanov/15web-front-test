//----------Функция для загрузки комикса------------------
function getDefinedComics(url, handleComics, handleError) {
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.status === 404 ? Promise.reject(`Комикс не найден.`) : Promise.reject(`Произошла ошибка. Попробуйте позже!`);
    })
    .then((result) => {
      handleComics(result);
    })
    .catch((err) => {
      handleError(err);
    });
}
//----------Функция для экспорта и формирования url------------------
export default function getComics(numberOfComics, handleComics, handleError) {
  if (numberOfComics > 0) {
    getDefinedComics(`https://xkcd.com/${numberOfComics}/info.0.json`, handleComics, handleError);
  } else {
    getDefinedComics(`https://xkcd.com/info.0.json`, handleComics, handleError);
  }
}