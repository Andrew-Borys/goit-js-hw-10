import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const searchParams = 'name,capital,population,flags,languages';

  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    },
  );
}
