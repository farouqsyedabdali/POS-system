import React, { useState } from "react";
import { Button, Card, Modal, Table, Alert, Dropdown } from "flowbite-react";
import products from "../data/productsData";
import axios from "axios";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    color: "info",
  }); // Added state for alert

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (productIndex) => {
    setCart((currentCart) =>
      currentCart.filter((_, index) => index !== productIndex)
    );
  };

  const calculateTotal = () => {
    let total = cart.reduce((total, product) => total + product.price, 0);
    if (selectedDiscount) {
      total *= 1 - selectedDiscount.value; // Apply discount if any
    }
    return total.toFixed(2);
  };

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: "", color: "info" }); // Hide alert after 2 seconds
    }, 2000);
  };

  const handleCheckout = async () => {
    const totalAmount = calculateTotal();
    if (parseFloat(totalAmount) <= 0) {
      showAlert(
        "Cannot checkout with $0. Please add items to your cart.",
        "warning"
      );
      return; // Exit if total amount is $0 or less
    }

    try {
      await axios.post("http://localhost:3001/record-transaction", {
        total: totalAmount,
        items: cart,
      });
      showAlert("Checkout successful!", "success");
      setCart([]);
    } catch (error) {
      console.error("Error recording transaction:", error);
      showAlert("Failed to record transaction", "failure");
    }
    setIsCheckoutModalOpen(false);
  };

  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const discounts = [
    { label: "No discount", value: null },
    { label: "10% Off", value: 0.1 },
    { label: "20% Off", value: 0.2 },
    // ... more discounts
  ];

  const handleSelectDiscount = (discount) => {
    setSelectedDiscount(discount);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">POS System</h1>
      {alert.show && (
        <Alert color={alert.color}>
          <span className="font-medium">{alert.message}</span>
        </Alert>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Product Listing */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Products</h2>
          <div>
            {products.map((product) => (
              <Card className="mb-3" key={product.id}>
                <div className="flex justify-between items-center">
                  <span>
                    {product.name} - ${product.price}
                  </span>
                  <Button color="info" onClick={() => addToCart(product)}>
                    Add {product.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Cart</h2>
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
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
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
            <div className="mt-3 font-semibold">Total: ${calculateTotal()}</div>
            <div className="grid grid-cols-2">
              <Button
                className="w-full"
                color="success"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <div className="m-auto">
                <Dropdown label="Discount" color="dark">
                  {discounts.map((discount) => (
                    <Dropdown.Item
                      key={discount.label}
                      onClick={() => handleSelectDiscount(discount)}
                    >
                      {discount.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        show={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      >
        <Modal.Header>Checkout</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p>Your total is ${calculateTotal()}</p>
            <p>Thank you for your purchase!</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsCheckoutModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
