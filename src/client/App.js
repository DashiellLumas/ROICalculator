import React, {Component} from "react";
import "./app.css";
import ReactImage from "./react.png";
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: null,
      downPayment: null,
      monthlyMortgage: null,
    };

    this.calculate = this.calculate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.calculateDownPayment = this.calculateDownPayment.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  calculate() {
    this.calculateDownPayment();


  }

  calculateDownPayment(){
      const percentageDownPayment = .2;
      let downPayment = parseInt(this.state.purchasePrice.replace(/,/g, '')) * percentageDownPayment;
      this.setState({downPayment: downPayment });
  }

  calculateMonthlyMortgage(){
  }

  render() {
    return (
      <div>
        <input
        type="text"
        name="purchasePrice"
        placeholder="Enter investment property address here..."
        value={ this.state.purchasePrice }
        onChange={ this.handleChange }
        className="question"
        id="msg"
      />
      <label for="nme">
      </label>
       <button value="Send" onClick={ this.calculate }>Calculate</button>
       <p> Down Payment: ${this.state.downPayment}</p>
       <p>Monthly Mortgage: $</p>
       <p>Property Tax: $</p>
       <p> Estimated Rent: $</p>
       <p>Closing Costs: $</p>
       <p>Insurance: $</p>
       <p>Property Management Fee: $</p>
       <p>Cashflow Per Month: $</p>
       <p>Annual Net Profit: $</p>
       <p>Total Expenses: $</p>
        </div>
    );
  }
}
