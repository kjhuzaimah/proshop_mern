import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

test('renders ProShop navbar', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const elements = screen.getAllByText(/proshop/i)
  expect(elements.length).toBeGreaterThan(0)
})
