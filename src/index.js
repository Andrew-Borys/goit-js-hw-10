import './css/styles.css';
import { values } from 'lodash';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {
  const inputValue = e.target.value;

  if (e.target.value === '') {
    refs.countriesList.innerHTML = '';
  }

  fetchCountries(inputValue.trim()).then(countries => {
    if (countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length >= 2 && countries.length <= 10) {
      renderCountryList(countries);
    } else if (countries.length === 1) {
      renderCountryInfo(countries);
    }
  });
}

function renderCountryList(countries) {
  console.log(countries);
  const markUp = countries.map(
    ({ flags, name }) => `<li class="country-item">
      <div class="country-container">
        <img src="${flags.png}" height="40" width="50" alt="flag${name.official}" />
        <h2 class='country-title'>${name.official}</h2>
      </div>
    </li>`,
  );

  refs.countriesList.innerHTML = markUp.join('');
}

function renderCountryInfo(countries) {
  const markUp = countries.map(
    ({ name, capital, population, flags, languages }) => `<div class='country-card'>
    <div class='country-container-info'>
      <img class='country-flag' src='${flags.png}'height="60" width="80"" alt='flag${
      name.official
    }' />
      <h2 class='country-title'>${name.official}</h2>
    </div>
      
      <p class='country-description'><b>Capital:</b> ${capital}</p>
      <p class='country-description'><b>Population:</b> ${population}</p>
      <p class='country-description'><b>Languages:</b> ${values(languages).join(', ')}</p>
    </div>`,
  );

  refs.countriesList.innerHTML = markUp.join();
}

function errorCatch(error) {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}
