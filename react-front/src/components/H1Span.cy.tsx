import H1Span from './H1Span'

describe('<H1Span />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<H1Span>Fulano de tal</H1Span>)
  })
})