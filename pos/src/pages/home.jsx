import React, { useState } from 'react';
import { Button, Card, Modal, Table } from 'flowbite-react';
import products from '../data/productsData';
import axios from 'axios';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const addToCart = (product) => {
    setCart(currentCart => [...currentCart, product]);
  };

  const removeFromCart = (productIndex) => {
    setCart(currentCart => currentCart.filter((_, index) => index !== productIndex));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotal();
    try {
      await axios.post('http://localhost:3001/record-transaction', { total: totalAmount, items: cart });
      alert('Checkout successful!');
      setCart([]);
    } catch (error) {
      console.error('Error recording transaction:', error);
      alert('Failed to record transaction');
    }
    setIsCheckoutModalOpen(false);
  };
  

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Simple POS System</h1>
      <div className='grid md:grid-cols-2 gap-4'>
        {/* Product Listing */}
        <div>
          <h2 className='text-xl font-semibold mb-3'>Products</h2>
          <div>
            {products.map((product) => (
              <Card key={product.id}>
                <div className='flex justify-between items-center'>
                  <span>{product.name} - ${product.price}</span>
                  <Button
                    color="info"
                    onClick={() => addToCart(product)}
                  >
                    Add {product.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div>
          <h2 className='text-xl font-semibold mb-3'>Cart</h2>
          <Card>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <Table hoverable={true}>
                <Table.Head>
                  <Table.HeadCell>Product</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                  <Table.HeadCell>Remove</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {cart.map((item, index) => (
                    <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>${item.price}</Table.Cell>
                      <Table.Cell>
                        <Button 
                          color="failure"
                          onClick={() => removeFromCart(index)}
                        >
                          Remove
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            <div className='mt-3 font-semibold'>Total: ${calculateTotal()}</div>
            <Button
              color="success"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Card>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        show={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      >
        <Modal.Header>
          Checkout
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <p>Your total is ${calculateTotal()}</p>
            <p>Thank you for your purchase!</p>
            {/* Here you would put your actual checkout form or confirmation details */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => setIsCheckoutModalOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
