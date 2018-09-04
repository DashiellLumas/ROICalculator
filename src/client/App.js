import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import React, {Component} from "react";
import ReactImage from "./react.png";
import axios from 'axios';
import convert from 'xml-js';

// import './style.scss';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      numberAddressQuery: '',
      streetNameAddressQuery: '',
      streetTypeAddressQuery: '',
      cityAddressQuery: '',
      stateAddressQuery: '',
      purchasePrice: null,
      downPayment: null,
      data: [],
      rentZestimate: null,
      propertyManagementFee: null,
      vacancyEstimate: null,
      repairsEstimate: null,
      closingCosts: null,
      monthlyPrincipal: null,
      propertyTax: null,
      totalExpenses: null,
      cashFlowPerMonth: null,
      annualNetProfit: null,
      capRate: null,
      cashOnCash: null,
      usStates: null
    };
    this.populateStates = this.populateStates.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleStreetNameChange = this.handleStreetNameChange.bind(this);
    this.handleStreetTypeChange = this.handleStreetTypeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleNumberAddressChange = this.handleNumberAddressChange.bind(this);
    this.calculateDownPayment = this.calculateDownPayment.bind(this);
    this.calculateRepairs = this.calculateRepairs.bind(this);
    this.calculateVacancy = this.calculateVacancy.bind(this);
    this.calculatePropertyManagementFee = this.calculatePropertyManagementFee.bind(this);
    this.calculateClosingCosts = this.calculateClosingCosts.bind(this);
    this.fetchSearchData = this.fetchSearchData.bind(this);
  }

  componentDidMount() {
    this.populateStates();
  }

  populateStates() {
    axios.get(`/api/states`).then(res => {
      this.setState({isLoaded: true, usStates: res.data})
    })
  }

  fetchSearchData() {
    const queryStringoldie = '1052+Helen+St&citystatezip=Detroit%2C+MI';
    let queryString = this.state.numberAddressQuery + '+' + this.state.streetNameAddressQuery + '+' + this.state.streetTypeAddressQuery + '&' + 'citystatezip=' + this.state.cityAddressQuery + '%2C' + '+' + this.state.stateAddressQuery;
    axios.get(`http://localhost:8080/api/propertyDetails/${queryString}`).then(res => {
      console.log(res.data["0"]['SearchResults:searchresults']);
      console.log(res.data["0"]['SearchResults:searchresults'].response.results.result.zestimate.amount._text);
      const purchasePrice = res.data["0"]['SearchResults:searchresults'].response.results.result.zestimate.amount._text;
      const rentZestimate = res.data["0"]['SearchResults:searchresults'].response.results.result.rentzestimate.amount._text;
      this.setState({data: res.data, rentZestimate: rentZestimate, purchasePrice: purchasePrice});
      this.calculatePropertyManagementFee(this.state.rentZestimate);
      this.calculateVacancy(this.state.rentZestimate);
      this.calculateRepairs(this.state.rentZestimate);
      this.calculateDownPayment(this.state.purchasePrice);
      this.calculateMonthlyMortgage(this.state.purchasePrice, this.state.downPayment);
      this.calculateClosingCosts(this.state.purchasePrice);
      this.calculatePropertyTax(this.state.purchasePrice);
      this.calculateTotalExpenses(this.state.repairsEstimate, this.state.vacancyEstimate, this.state.propertyTax, this.state.propertyManagementFee, this.state.monthlyPrincipal);
      this.calculateCashflowPerMonth(this.state.rentZestimate, this.state.totalExpenses);
      this.calculateAnnualNetProfit(this.state.cashFlowPerMonth);
      this.calculateCapRate(this.state.annualNetProfit, this.state.monthlyPrincipal, this.state.purchasePrice);
      this.calculcateCashOnCash(this.state.annualNetProfit, this.state.downPayment, this.state.closingCosts);
    })

  }

  handleNumberAddressChange(event) {
    this.setState({numberAddressQuery: event.target.value});

  }

  handleStreetNameChange(event) {
    this.setState({streetNameAddressQuery: event.target.value});
  }
  handleStreetTypeChange(event) {
    this.setState({streetTypeAddressQuery: event.target.value});
  }
  handleCityChange(event) {
    this.setState({cityAddressQuery: event.target.value});
  }

  handleStateChange(event) {
    this.setState({stateAddressQuery: event.target.value});
  }

  calculateDownPayment(purchasePrice) {
    let downPayment = Math.round(Number(this.state.purchasePrice) * .2);
    this.setState({downPayment: downPayment});
  }

  calculateMonthlyMortgage(purchasePrice, downPayment) {
    let monthlyPrincipal = Math.round(((Number(purchasePrice) - Number(downPayment)) / 30) / 12)
    this.setState({monthlyPrincipal: monthlyPrincipal})
  }

  calculatePropertyManagementFee(rentZestimate) {
    let propertyManagementFee = Math.round(Number(rentZestimate) * .1);
    this.setState({propertyManagementFee: propertyManagementFee})
  }

  calculateVacancy(rentZestimate) {
    let vacancyEstimate = Math.round(Number(rentZestimate) * .1);
    this.setState({vacancyEstimate: vacancyEstimate});
  }

  calculateRepairs(rentZestimate) {
    let repairsEstimate = Math.round(Number(rentZestimate) * .05);
    this.setState({repairsEstimate: repairsEstimate});
  }

  calculateClosingCosts(purchasePrice) {
    let closingCosts = Math.round(Number(purchasePrice) * .0379);
    this.setState({closingCosts: closingCosts});
  }

  calculatePropertyTax(purchasePrice) {
    let propertyTax = Math.round((Number(purchasePrice) * .0276) / 12);
    this.setState({propertyTax: propertyTax});
  }

  calculateTotalExpenses(repairsEstimate, vacancyEstimate, propertyTax, propertyManagementFee, monthlyPrincipal) {
    let totalExpenses = Math.round(Number(repairsEstimate) + Number(vacancyEstimate) + Number(propertyTax) + Number(propertyManagementFee) + Number(monthlyPrincipal));
    this.setState({totalExpenses: totalExpenses})
  }

  calculateCashflowPerMonth(rentZestimate, totalExpenses) {
    let cashFlowPerMonth = Math.round(Number(rentZestimate) - Number(totalExpenses));
    this.setState({cashFlowPerMonth: cashFlowPerMonth});
  }

  calculateAnnualNetProfit(cashFlowPerMonth) {
    let annualNetProfit = Math.round((Number(cashFlowPerMonth) * 12));
    this.setState({annualNetProfit: annualNetProfit});
  }

  calculateCapRate(annualNetProfit, monthlyPrincipal, purchasePrice) {
    let capRate = Math.round(((Number(annualNetProfit) + (Number(monthlyPrincipal) * 12)) / Number(purchasePrice)) * 100)
    this.setState({capRate: capRate})
  }

  calculcateCashOnCash(annualNetProfit, downPayment, closingCosts) {
    let cashInvested = Number(downPayment) + Number(closingCosts);
    let cashOnCash = Math.round((Number(annualNetProfit) / Number(cashInvested)) * 100);
    this.setState({cashOnCash: cashOnCash})
  }

  calculate() {}
  render() {
    if (this.state.isLoaded == true) {
      return (
        <div className="container-fluid">
          <h1 class="center-text">Capitalization Rate Calculator</h1>
          <div className="row">
            <div className="col-md-4">
              <input type="text" name="Number" placeholder="Number" onChange={this.handleNumberAddressChange} className="question" id="msg"/>
              <input type="text" name="Street Name" placeholder="Street Name" onChange={this.handleStreetNameChange} className="question"/>
              <input type="text" name="Street Type" placeholder="Street Type" onChange={this.handleStreetTypeChange} className="question"/>
              <input type="text" name="City" placeholder="City" onChange={this.handleCityChange} className="question"/>
              <div className="select-dropdown">
              <select className="question" onChange={this.handleStateChange}>
                {Object.keys(this.state.usStates).map((abbreviation, key) => {
                  return (

                      <option key={key}>
                        {this.state.usStates[key].abbreviation}
                      </option>
                  )
                })}
              </select>
                </div>
              <button value="Send" onClick={this.fetchSearchData}>Calculate</button>
            </div>
            <div class="col-md-3 col-md-offset-2"></div>
            <div className="col-md-4 calculations">
              <p>Purchase Price: ${this.state.purchasePrice}</p>
              <p>Down Payment: ${this.state.downPayment}</p>
              <p>Monthly Mortgage: ${this.state.monthlyPrincipal}</p>
              <p>Monthly Rent ${this.state.rentZestimate}</p>
              <p>Repairs ${this.state.repairsEstimate}</p>
              <p>Vacancy ${this.state.vacancyEstimate}</p>
              <p>Property Tax: ${this.state.propertyTax}</p>
              <p>Closing Costs: ${this.state.closingCosts}</p>
              <p>Property Management Fee: ${this.state.propertyManagementFee}</p>
              <p>Cashflow Per Month: ${this.state.cashFlowPerMonth}</p>
              <p>Annual Net Profit: ${this.state.annualNetProfit}</p>
              <p>Total Expenses: ${this.state.totalExpenses}</p>
              <p>Cash on Cash Rate: {this.state.cashOnCash}%</p>
              <p>Cap Rate: {this.state.capRate}%</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="loader">Loading...</div>
      )
    }

  }
}
