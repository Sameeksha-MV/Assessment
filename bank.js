let accNumber=[]
let accDetails= []
class User{
     constructor(name, initialAmount,accType,email, phone_no){
        this.name= name;
        this.initialAmount=initialAmount;
        this.accType = accType;
        this.email = email;
        this.phone_no = phone_no;
        this.accNumber= Math.floor(Math.random() * Date.now()); // To generate unique account number
        while(accDetails.indexOf(this.accNumber)!=-1){
            this.accNumber= Math.floor(Math.random() * Date.now());
        }
        accDetails.push(this.accNumber)
    }
    interest(rateOfInterest, time){  // To calculate interest
        let interest = ((this.initialAmount*rateOfInterest*time)/365);
        this.initialAmount += interest;
        console.log("Interest per year :", interest);
    }
}
// Deposit 
User.prototype.deposit = function(amount) {
    if (this._isPositive(amount)) {
        this.initialAmount += amount;
        console.log(`Deposit: ${this.name} new balance is ${this.initialAmount}`);
        return true;
      }
      return false; 
}

// To make Withdrawal
User.prototype.withdraw = function(amount) {
    if (this._isAllowed(amount)) {
        this.initialAmount -= amount;
        console.log(`Withdraw: ${this.name} new balance is ${this.initialAmount}`);
        return true;
      }
      return false;
}
// To Check Balance Enquiry
User.prototype.balanceEnq = function(accNumber){
    this.initialAmount = this.initialAmount
    console.log(`Available Balance: ${this.name} has the balance ${this.initialAmount}`);
}

//Transfer amount one account to another
User.prototype.transfer = function (transferAmount, account){
    if (account instanceof User) {
      if (this.withdraw(transferAmount)) {
        account.deposit(transferAmount);
        return true;
      } else {
        console.log("An error occured withdrawing that amount");
        return false;
      }
    }
    console.log("Provided account was not an account with our bank");
    return false;
  };

User.prototype._isPositive = function(amount) { 
    const isPositive = amount > 0;
    if (!isPositive) {
      console.error('Amount must be positive!');
      return false;
    }
    return true;
  }
  
User.prototype._isAllowed = function(amount) {
    if (!this._isPositive(amount)) return false;
  
    const isAllowed = this.initialAmount - amount >= 0;
    if (!isAllowed) {
      console.error('You have insufficent funds!');
      return false;
    }
    return true;
  }

// User.prototype.Fd = function fdInterest(interest, years){  // To calculate fd interest
//         let result = Math.round(initialAmount * (1 + interest) ** years);
//         this.initialAmount += interest;
//         console.log(result);
//     }

class Loan extends User{
     getLoan(startingLoanAmount, totalPayments, interestRate)
    {
    let interestRatePerMonth = interestRate / 12;
    return startingLoanAmount * interestRatePerMonth * (Math.pow(1 + interestRatePerMonth, totalPayments)) / (Math.pow(1 + interestRatePerMonth, totalPayments) - 1);
    }}

class AccManager extends User{
    constructor(name, initialAmount,accType,email, phone_no,statements){
        super(name, initialAmount,accType,email, phone_no);
        this.statements =statements;
    }
 
}



let user = new User('Sameeksha',20000,'Savings','sameeksha@gmail.com',1234567890);

let user1 = new User('Sushan',20000,'Savings','sushan@gmail.com',12345585890);
console.log(user)
console.log(`${user.name} : Account Number- ` +  accDetails)
// To withdraw money from user
user.withdraw(5000)
// To check balance
user.balanceEnq()
// To make deposit
user.deposit(1000)
// To transfer money
user.transfer(200,user1)
// To calculate interest
user.interest(6,1);

