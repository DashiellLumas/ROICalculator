import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch("/api/getUsername")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <h1>Nice input box</h1>
<form>
  <input type="text" name="name" class="question" id="nme" required autocomplete="off" />
  <label for="nme"><span>What's your name?</span></label>
  <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
  <label for="msg"><span>What's your message?</span></label>
  <input type="submit" value="Submit!" />
</form>
        Purchase
        Down payment
        Monthly Rent
        Closing costs
        Property tax
        Insurance
        Property management fee
        Mortage
        HOA
        Vacancy
        Repairs
        Total expenses
        Amount cashflow per month = Monthly Rent - Total expenses
        Annual Net = (Amount cashflow per month)(12)
        Cap Rate = (Annual Net - Mortgage(12))/Purchase
        Cash Invested = Down Payment + Closing Costs
        Cash-on-Cash = Annual Net / Cash Invested
      </div>
    );
  }
}
