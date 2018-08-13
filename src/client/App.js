import React, {Component} from "react";
import "./app.css";
import ReactImage from "./react.png";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: null,
      percentageDownPayment: .2,
      downPayment: null,
    };

    this.calculate = this.calculate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  calculate() {
    let x = parseInt(this.state.purchasePrice.replace(/,/g, '')) * this.state.percentageDownPayment
    this.setState({downPayment: x });

  }

  render() {
    return (
      <div>
        <input
        type="text"
        name="purchasePrice"
        placeholder="Enter purchase price here..."
        value={ this.state.purchasePrice }
        onChange={ this.handleChange }
      />
       <button value="Send" onClick={ this.calculate }>Calculate</button>
       <p>{this.state.downPayment}</p>
        </div>
    );
  }
}
