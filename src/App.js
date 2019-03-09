import React, {Component} from 'react';
import './assets/css/App.css';
import StripeExample from './components/StripeExample'
import {Elements, StripeProvider} from 'react-stripe-elements';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_JhKEZAELWzRIbo8ETppaJFjc">
        <div className="m-container">
          <h1>React-Firestore-Stripe Example</h1>
          <Elements>
            <StripeExample />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;