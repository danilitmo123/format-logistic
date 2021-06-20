import React, {useState, useEffect} from 'react';
import Select from 'react-select';

import axios from "axios";

import './HubsPage.scss'

const AddHubsPage = () => {

  const [allCountries, setAllCountries] = useState([])
  const [countryInput, setCountryInput] = useState('')
  let countryOptions = []

  const newObj = () => {
    allCountries.map(item => {
      countryOptions.push({value: item.name, label: item.name})
    })
  }

  const getCountries = async () => {
    const countries = await axios.get('https://ancient-temple-39835.herokuapp.com/geo/countries/')
    setAllCountries([...countries.data])
  }

  useEffect(() => {
    newObj()
  }, [allCountries])

  useEffect(() => {
    getCountries()
  }, [])

  return (
      <section className={'hubs-page-wrapper'}>
        <div className={'top-hubs-tile'}>
          <div className={'title'}>Добавить плечо</div>
          <button className={'back-to-hubs-button'}>Вернуться</button>
        </div>
        <div className={'hubs-settings-wrapper'}>
          <div className={'arrival-select'}>
            <div>
              <pre>inputValue: "{countryInput}"</pre>
              <Select
                  options={countryOptions}
              />
            </div>
          </div>
        </div>
      </section>
  );
};

export default AddHubsPage;