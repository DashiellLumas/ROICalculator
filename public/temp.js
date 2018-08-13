<div>
        <h1>Enter purchase price to receive calculation details:</h1>

         {/* Amount cashflow per month = Monthly Rent - Total expenses Annual Net = (Amount cashflow per month)(12) Cap Rate = (Annual Net - Mortgage(12))/Purchase Cash Invested = Down Payment + Closing Costs Cash-on-Cash = Annual Net / Cash Invested */}
          <input type="text"  value={this.state.inputValue} onChange={this.handleChange} name="name"/>
          <label for="nme">
            <span>Purchase price</span>
          </label>
          <p>Down payment:</p>
          <button onClick={this.calculate}>Calculate Down payment</button>




          {/* <label for="msg">
            <span>Down payment</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Monthly Rent</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Closing costs</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Property tax</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Insurance</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Property management fee</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Mortgage payment</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>HOA fee</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Vacancy</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Repairs</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Total Expenses</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Amount cashflow per month</span>
          </label>
          <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
          <label for="msg">
            <span>Annual net profit</span>
          </label>

          <button>Calculae cap rate</button> */}