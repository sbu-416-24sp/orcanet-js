import express from 'express';
import axios from 'axios';
import { walletInfo } from '../../../Libp2p/utils.js';

const wallet = express.Router();
const transactionURL = 'http://127.0.0.1:19124/wallet/primary/tx/history'

function getFilteredTransactions() {
   return new Promise((resolve, reject) => {
      axios.get(transactionURL)
         .then(response => {
            const transactions = response.data;
            const filteredTransactions = [];
            for (const tx of transactions) {
               if (tx['height'] != -1) continue;
               const newTx = {}
               newTx['id'] = tx['hash'];
               newTx['reason'] = '';
               newTx['date'] = tx["mdate"];
               newTx['status'] = tx["confirmations"] > 0 ? "Success" : "Unconfirmed";
               if (tx?.outputs[0]?.path?.name == 'default') {
                  newTx['receiver'] = walletInfo['walletID'];
                  newTx['amount'] = parseFloat(tx?.outputs[0].value) / 100000000;
               } else {
                  newTx['receiver'] = tx?.outputs[0]?.address
                  newTx['amount'] = parseFloat(tx?.outputs[0].value) / -100000000;
               }
               filteredTransactions.push(newTx)
            }
            resolve(filteredTransactions);
         })
         .catch(error => {
            reject(error);
         })
   })
}

function getRevenue(type, transactions) {
   // Initialize an empty object to store revenue data
   const revenueData = {};

   // Iterate over each transaction
   transactions.forEach(transaction => {
      // Extract date information from the transaction
      const date = new Date(transaction.date);
      let key;

      // Determine the key based on the type of revenue (daily, monthly, yearly)
      if (type === 'daily') {
         key = `${date.getMonth() + 1}/${date.getDate()}`;
      } else if (type === 'monthly') {
         const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         key = monthNames[date.getMonth()];
      } else if (type === 'yearly') {
         key = date.getFullYear().toString();
      } else {
         throw new Error('Invalid revenue type');
      }

      // Initialize revenue data for the key if it doesn't exist
      if (!revenueData[key]) {
         revenueData[key] = { earning: 0, spending: 0 };
      }

      // Update earning and spending based on transaction amount
      if (transaction.amount > 0) {
         revenueData[key].earning += transaction.amount;
      } else {
         revenueData[key].spending -= transaction.amount;
      }
   });

   // Convert revenue data to the desired response format
   const revenue = Object.entries(revenueData).map(([date, { earning, spending }]) => ({ date, earning, spending }));

   return revenue;
}

wallet.get('/wallet/balance', async (req, res) => {
   let statusCode = 200;
   let message = '';
   const { wallet_id } = req.body;
   try {
      axios.post('http://127.0.0.1:19124/', {
         method: 'getbalance'
      })
         .then(response => {
            const balance = parseFloat(response.data["result"])
            message = {
               wallet_id: walletInfo['walletID'],
               balance
            }
         })
         .catch(error => {
            statusCode = 500;
            message = "Error";
            console.error('Error:', error);
         })
         .finally(() => res.status(statusCode).send(message));
   } catch (error) {
      statusCode = 500;
      message = "Error";
      res.status(statusCode).send(message);
   }
});

wallet.get('/wallet/revenue/:type', async (req, res) => {
   let statusCode = 200;
   let message = '';
   const type = req.params.type;
   try {
      const transactions = await getFilteredTransactions();
      const revenue = getRevenue(type, transactions);
      message = {
         wallet_id: walletInfo['walletID'],
         revenue
      }
   } catch (error) {
      statusCode = 500;
      message = "Error";
   }

   res.status(statusCode).send(message);
});

wallet.get('/wallet/transactions/latest', async (req, res) => {
   let statusCode = 200;
   let message = '';
   const { wallet_id } = req.body;
   try {
      const transactions = await getFilteredTransactions();
      message = {
         wallet_id: walletInfo['walletID'],
         transactions: transactions.slice(0, Math.min(5, transactions.length))
      }
   } catch (error) {
      statusCode = 500;
      message = "Error";
   }
   res.status(statusCode).send(message);
});

wallet.get('/wallet/transactions/complete', async (req, res) => {
   let statusCode = 200;
   let message = '';
   const { wallet_id } = req.body;
   try {
      const transactions = await getFilteredTransactions();
      message = {
         wallet_id: walletInfo['walletID'],
         transactions: transactions
      }
   } catch (error) {
      statusCode = 500;
      message = "Error";
   }

   res.status(statusCode).send(message);
});

wallet.post('/wallet/transfer', async (req, res) => {
   let statusCode = 200;
   let message = '';
   const { wallet_id, receiver, sendAmount, reason, date } = req.body;
   try {
      axios.post('http://127.0.0.1:19124/', {
         method: 'sendfrom',
         params: ['default', receiver, sendAmount]
      })
         .then(response => {
            message = {
               id: response.data.result
            }
         })
         .catch(error => {
            statusCode = 500;
            message = "Error";
            console.error('Error:', error);
         })
         .finally(() => res.status(statusCode).send(message));
   } catch (error) {
      statusCode = 500;
      message = "Error";
      res.status(statusCode).send(message);
   }

});
export default wallet;