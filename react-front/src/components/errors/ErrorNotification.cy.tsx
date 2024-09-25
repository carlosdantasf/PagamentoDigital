import ErrorNotification from './ErrorNotification'

describe('<ErrorNotification />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorNotification message='algo inesperado aconteceu' onRetry={() => { }} />)
  })
})