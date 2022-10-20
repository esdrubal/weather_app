import React from 'react'
import {waitFor, screen, fireEvent} from '@testing-library/react'
// @ts-ignore
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import LocationWeatherList from '../components/LocationWeatherList'
import {renderWithProviders} from './testUtils'

test('add Porto, Portugal as location', async () => {
  const { container } = renderWithProviders(<LocationWeatherList />)

  await waitFor(() => {
    userEvent.selectOptions(screen.getByTestId("select-country"), ["PT"]);
  }, {timeout: 500})
  await waitFor(() => {
    userEvent.selectOptions(screen.getByTestId("select-state"), ["13"]);
  }, {timeout: 500})
  await waitFor(() => {
    userEvent.selectOptions(screen.getByTestId("select-city"), ["Porto"]);
  }, {timeout: 500})
  
  await waitFor(async () => {
    await fireEvent.click(screen.getByTestId('add-location-btn'));
  }, {timeout: 500})

  await waitFor(() => {
    expect(container).toHaveTextContent('Porto, Portugal')
  }, {timeout: 500}) 
  })

  test('remove Porto, Portugal from locations', async () => {
    const { container } = renderWithProviders(<LocationWeatherList />)
    await waitFor(() => {
      expect(container).toHaveTextContent('Porto, Portugal')
    }, {timeout: 500})
    
    await waitFor(async () => {
      const btn = screen.getByText('Porto, Portugal').parentElement?.getElementsByTagName("button")[0]!
      await fireEvent.click(btn)
    }, {timeout: 500})
    
    await waitFor(() => {
      expect(container).toHaveTextContent('You can add new locations')
    }, {timeout: 500})
    })