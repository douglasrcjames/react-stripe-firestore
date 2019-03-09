import React, { Component } from 'react'
import fire from '../config/Fire';
import {CardElement, CardNumberElement,CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';

class StripeExample extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitNewCreditCard = this.submitNewCreditCard.bind(this);
        // this.submitNewCharge = this.submitNewCharge.bind(this);
        this.state = {
            currentUser: null,
            sources: {},
            stripeCustomerInitialized: false,
            newCreditCard: {
                number: '4242424242424242',
                cvc: '111',
                exp_month: 1,
                exp_year: 2020,
                address_zip: '00000'
                },
            charges: {},
            newCharge: {
                source: null,
                amount: 2000
            }
        }
    }

    componentDidMount(){
      // // Listening functions
      // fire.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).onSnapshot(snapshot => {
      //   this.stripeCustomerInitialized = (snapshot.data() !== null);
      // }, () => {
      //   this.stripeCustomerInitialized = false;
      // });

      // fire.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('sources').onSnapshot(snapshot => {
      //   let newSources = {};
      //    snapshot.forEach(doc => {
      //      const id = doc.id;
      //      newSources[id] = doc.data();
      //    })
      //    this.sources = newSources;
      //  }, () => {
      //    this.sources = {};
      //  });

      //  fire.firestore().collection('stripe_customers').doc(`${this.currentUser.uid}`).collection('charges').onSnapshot(snapshot => {
      //  let newCharges = {};
      //   snapshot.forEach(doc => {
      //     const id = doc.id;
      //     newCharges[id] = doc.data();
      //   })
      //   this.charges = newCharges;
      //  }, () => {
      //    this.charges = {};
      //  });
    }

    handleChange(e){
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e){
      e.preventDefault();
      this.submitNewCreditCard()
    }


    submitNewCreditCard(){
      // Using createToken wrong.
      // - How do we access the element from react-elements?
      // - https://stripe.com/docs/stripe-js/reference#stripe-elements
        this.props.stripe.card.createToken({
            number: this.state.newCreditCard.number,
            cvc: this.state.newCreditCard.cvc,
            exp_month: this.state.newCreditCard.exp_month,
            exp_year: this.state.newCreditCard.exp_year,
            address_zip: this.state.newCreditCard.address_zip
          }, (status, response) => {
            if (response.error) {
              this.newCreditCard.error = response.error.message;
            } else {
              fire.firestore().collection('stripe_customers').doc('UID1234567890').collection('tokens').add({token: response.id}).then(() => {
                //Creates a blank card, which will trigger the firebase function?
                this.newCreditCard = {
                  number: '',
                  cvc: '',
                  exp_month: 1,
                  exp_year: 2017,
                  address_zip: ''
                };
              });
            }
          });
    }
    
    submitNewCharge(){
      fire.firestore().collection('stripe_customers').doc(this.currentUser.uid).collection('charges').add({
          source: this.state.newCharge.source,
          amount: parseInt(this.state.newCharge.amount)
        });
    }
    
      
    render() {
        return (
          <div>
            <h4>Add a new card to your account:</h4>
            <CardElement />
            <button onClick={this.handleSubmit}>Send</button>
            {/* Add the remaining section for charging */}
          </div>
        )
    }
}

export default injectStripe(StripeExample);