import { useState } from "react";
import "./index.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const handleAdd = () => {
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed === 0) {
      setError("Please enter a valid non-zero amount.");
      return;
    }
    setError("");
    setTransactions([
      { id: Date.now(), description: description.trim(), amount: parsed },
      ...transactions,
    ]);
    setDescription("");
    setAmount("");
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const fmt = (num) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(num);

  return (
    <div className="app">
      <h1>Budget Tracker</h1>
      <p style={{ color: "#888", marginBottom: "24px", fontSize: "0.9rem" }}>
        Track your income and expenses
      </p>

      <div className="balance-card">
        <div className="balance-label">Total Balance</div>
        <div className={`balance-amount ${balance < 0 ? "negative" : "positive"}`}>
          {fmt(balance)}
        </div>
      </div>

      <div className="income-expense">
        <div className="stat-card">
          <div className="stat-label">Income</div>
          <div className="stat-amount income">{fmt(income)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Expenses</div>
          <div className="stat-amount expense">{fmt(expenses)}</div>
        </div>
      </div>

      <div className="form-card">
        <h2>Add Transaction</h2>
        {error && <div className="error-msg" data-testid="error-msg">{error}</div>}
        <input
          data-testid="description-input"
          type="text"
          placeholder="Description (e.g. Groceries)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          data-testid="amount-input"
          type="number"
          placeholder="Amount (use - for expenses, e.g. -50)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button data-testid="add-btn" onClick={handleAdd}>
          Add Transaction
        </button>
      </div>

      <div className="transactions-card">
        <h2>Transactions</h2>
        {transactions.length === 0 ? (
          <div className="empty-state">No transactions yet. Add one above.</div>
        ) : (
          transactions.map((t) => (
            <div className="transaction-item" key={t.id} data-testid="transaction-item">
              <span className="transaction-name">{t.description}</span>
              <div className="transaction-right">
                <span className={`transaction-amount ${t.amount > 0 ? "income" : "expense"}`}>
                  {fmt(t.amount)}
                </span>
                <button
                  className="delete-btn"
                  data-testid="delete-btn"
                  onClick={() => handleDelete(t.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;