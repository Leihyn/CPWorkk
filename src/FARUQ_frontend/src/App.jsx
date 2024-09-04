import { useState, useEffect } from 'react';
import { FARUQ_backend } from 'declarations/FARUQ_backend';

function App() {
  const [accountId, setAccountId] = useState('');
  const [initialBalance, setInitialBalance] = useState(0);
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');
  const [accounts, setAccounts] = useState([]);

  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferMessage, setTransferMessage] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  function handleCreateAccount(event) {
    event.preventDefault();
    FARUQ_backend.createAccount(accountId, initialBalance, desc)
      .then(() => {
        setMessage(`Account ${accountId} created successfully!`);
        fetchAccounts();
      })
      .catch(() => {
        setMessage('Failed to create account.');
      });
    return false;
  }

  function handleTransfer(event) {
    event.preventDefault();
    FARUQ_backend.transfer(fromAccountId, toAccountId, transferAmount)
      .then((success) => {
        if (success) {
          setTransferMessage(`Transferred ${transferAmount} from ${fromAccountId} to ${toAccountId} successfully!`);
          fetchAccounts();
        } else {
          setTransferMessage('Transfer failed. Please check the account details and balance.');
        }
      })
      .catch(() => {
        setTransferMessage('Transfer failed due to an error.');
      });
    return false;
  }

  function fetchAccounts() {
    FARUQ_backend.getAllAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />

      <section>
        <h2>Create Account</h2>
        <form action="#" onSubmit={handleCreateAccount}>
          <label htmlFor="accountId">Account ID: &nbsp;</label>
          <input
            id="accountId"
            alt="Account ID"
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <br /><br />
          <label htmlFor="initialBalance">Initial Balance: &nbsp;</label>
          <input
            id="initialBalance"
            alt="Initial Balance"
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(Number(e.target.value))}
          />
          <br /><br />
          <label htmlFor="desc">Description: &nbsp;</label>
          <input
            id="desc"
            alt="Description"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <br /><br />
          <button type="submit">Create Account</button>
        </form>
        <section id="message">{message}</section>
      </section>

      <br />
      <section>
        <h2>Transfer Funds</h2>
        <form action="#" onSubmit={handleTransfer}>
          <label htmlFor="fromAccountId">From Account ID: &nbsp;</label>
          <input
            id="fromAccountId"
            alt="From Account ID"
            type="text"
            value={fromAccountId}
            onChange={(e) => setFromAccountId(e.target.value)}
          />
          <br /><br />
          <label htmlFor="toAccountId">To Account ID: &nbsp;</label>
          <input
            id="toAccountId"
            alt="To Account ID"
            type="text"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
          />
          <br /><br />
          <label htmlFor="transferAmount">Amount: &nbsp;</label>
          <input
            id="transferAmount"
            alt="Transfer Amount"
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
          />
          <br /><br />
          <button type="submit">Transfer</button>
        </form>
        <section id="transferMessage">{transferMessage}</section>
      </section>

      <br />
      <h2>All Accounts</h2>
      <ul>
        {accounts.map(([id, account]) => (
          <li key={id}>
            <strong>{id}</strong>: Balance = {account.balance.toString()}, Owner = {account.owner.toString()}, Description = {account.desc}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
