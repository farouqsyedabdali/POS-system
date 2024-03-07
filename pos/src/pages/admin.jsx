import React, { useState, useEffect } from "react";
import { Button, Table, TextInput, Label, Alert } from "flowbite-react";
import axios from "axios";

const AdminPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const [showEmployees, setShowEmployees] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const [alert, setAlert] = useState({ show: false, message: "", type: "" }); // State for alerts

  // Function to show an alert
  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000); // Hide after 3 seconds
  };

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/employees");
      setEmployees(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      showAlert("Failed to fetch employees", "error");
      setIsLoading(false);
    }
  };

  const addEmployee = async () => {
    if (
      !newEmployee.id ||
      !newEmployee.name ||
      !newEmployee.email ||
      !newEmployee.role
    ) {
      showAlert("All fields must be filled out", "warning");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("http://localhost:3001/employees", newEmployee);
      setNewEmployee({ id: "", name: "", email: "", role: "" }); // Reset form
      fetchEmployees();
      showAlert("Employee added successfully", "success"); // Show success alert
    } catch (error) {
      console.error("Error adding employee:", error);
      showAlert("Failed to add employee", "error"); // Show error alert
    }
    setIsLoading(false);
  };

  const removeEmployee = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      fetchEmployees();
      showAlert("Employee removed successfully", "success");
    } catch (error) {
      console.error("Error removing employee:", error);
      showAlert("Failed to remove employee", "error");
    }
    setIsLoading(false);
  };

  const toggleEmployees = () => {
    setShowEmployees(!showEmployees);
  };

  const toggleTransactions = async () => {
    if (!showTransactions && transactions.length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        showAlert("Failed to fetch transactions", "error");
      }
      setIsLoading(false);
    }
    setShowTransactions(!showTransactions); // Toggle the visibility
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Alert */}
      {alert.show && (
        <Alert color={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Add Employee</h2>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="id" value="Employee ID" />
          </div>
          <TextInput
            id="id"
            type="text"
            placeholder="Enter ID"
            value={newEmployee.id}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, id: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Employee Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Enter Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Employee Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Enter Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="role" value="Employee Role" />
          </div>
          <TextInput
            id="role"
            type="text"
            placeholder="Enter Role"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
          />
        </div>
        <Button className="mb-4" onClick={addEmployee} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Employee"}
        </Button>
      </div>

      <Button className="mb-4" onClick={toggleEmployees} disabled={isLoading}>
        {isLoading
          ? "Loading..."
          : showEmployees
          ? "Hide Employees"
          : "View Employees"}
      </Button>

      {showEmployees && employees.length > 0 && (
        <Table hoverable={true} className="mb-5">
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {employees.map((employee) => (
              <Table.Row key={employee.id}>
                <Table.Cell>{employee.id}</Table.Cell>
                <Table.Cell>{employee.name}</Table.Cell>
                <Table.Cell>{employee.email}</Table.Cell>
                <Table.Cell>{employee.role}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <Button
        className="mb-4"
        onClick={toggleTransactions}
        disabled={isLoading}
      >
        {isLoading
          ? "Loading..."
          : showTransactions
          ? "Hide Transactions"
          : "View Transactions"}
      </Button>

      {showTransactions && transactions.length > 0 && (
        <Table hoverable={true} className="mt-4">
          <Table.Head>
            <Table.HeadCell>Transaction ID</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {transactions.map((transaction) => (
              <Table.Row key={transaction.id}>
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
