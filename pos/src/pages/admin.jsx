import React, { useState } from 'react';
import { Button, Table } from 'flowbite-react';
import axios from 'axios';

const AdminPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/transactions');
      setTransactions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions');
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
      <Button onClick={fetchTransactions} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'View Transactions'}
      </Button>
      {transactions.length > 0 && (
        <Table hoverable={true} className="mt-4">
          <Table.Head>
            <Table.HeadCell>Transaction ID</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {transactions.map((transaction, index) => (
              <Table.Row key={index}>
                <Table.Cell>{transaction.id}</Table.Cell>
                <Table.Cell>${transaction.amount}</Table.Cell>
                <Table.Cell>{transaction.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default AdminPage;
