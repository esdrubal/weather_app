import { useAppSelector, useAppDispatch } from '../redux/hooks';
import React from 'react';
import { Country, State, City } from "country-state-city";
import {setCountryCode, setStateCode, setCityCode, closeAddLocation} from '../redux/slices/addLocation'
import {addLocation} from '../redux/slices/weather'
import Select from './Select'
import styled from 'styled-components'

interface Props {
}

const AddLocationText = styled.div`
  padding-right:5px;
  font-weight: 600;`

const AddLocation: React.FC<Props> = () => {
  
  const countryCode = useAppSelector((state) => state.addLocation.countryCode);
  const stateCode = useAppSelector((state) => state.addLocation.stateCode);
  const cityCode = useAppSelector((state) => state.addLocation.cityCode);

  const dispatch = useAppDispatch()

  const getCountries = () =>
    Country.getAllCountries()
      .map((country) => ({text: country.name, value: country.isoCode}))

  const getStates = (countryCode:string) =>
    State.getStatesOfCountry(countryCode)
      .map((state) => ({text: state.name, value: state.isoCode}))

  const getCities = (countryCode:string, stateCode:string) =>
    City.getCitiesOfState(countryCode, stateCode)
      .map((city) => ({text: city.name, value: city.name}))

  const states = getStates(countryCode)
  const cities = getCities(countryCode, stateCode)

  return (
    <div>
      <form onSubmit={(e) => {
        dispatch(addLocation({countryCode: countryCode, stateCode: stateCode, cityCode: cityCode}))
        dispatch(closeAddLocation())
        e.preventDefault();
      }}>
        <AddLocationText>Add Location:</AddLocationText> 
        <Select
          options={getCountries()}
          value={countryCode}
          selectMessage='Select a country'
          onChange={(value:string) => {
            dispatch(setCountryCode(value))
          }}
        />
        {countryCode !== '' && states.length !== 0 &&
          <Select
            options={states}
            value={stateCode}
            selectMessage='Select a state'
            onChange={(value:string) => {
              dispatch(setStateCode(value))
            }}
          />
        }
        {stateCode !== '' && cities.length !== 0 &&
          <Select
            options={cities}
            value={cityCode}
            selectMessage='Select a city'
            onChange={(value:string) => {
              dispatch(setCityCode(value))
            }}
          />
        }
        {countryCode !== '' && (cityCode !== '' || cities.length === 0) &&
          <button type="submit">Add</button>
        }
      </form>
    </div>
  );
};

export default AddLocation;