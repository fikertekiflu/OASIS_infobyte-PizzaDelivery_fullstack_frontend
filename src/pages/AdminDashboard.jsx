import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [inventory, setInventory] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedSection, setSelectedSection] = useState('inventory');
  const [inventoryInput, setInventoryInput] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchInventory();
    fetchOrders();
  }, []);

  const updateInventoryItem = async (item) => {
    try {
      const updatedInventory = { ...inventory, [item]: inventoryInput[item] };
      await axios.put('http://localhost:5000/api/inventory', updatedInventory);
      setInventory(updatedInventory);
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data); // Refresh the orders to reflect the updated status
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-red-700 text-white w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>
        <button className={`w-full text-left p-2 hover:bg-red-600 ${selectedSection === 'inventory' ? 'bg-red-500' : ''}`} onClick={() => setSelectedSection('inventory')}>
          Inventory Management
        </button>
        <button className={`w-full text-left p-2 hover:bg-red-600 ${selectedSection === 'orders' ? 'bg-red-500' : ''}`} onClick={() => setSelectedSection('orders')}>
          Order Management
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {selectedSection === 'inventory' ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg mb-2">Available Items</h3>
              <ul className="space-y-2">
                {Object.entries(inventory).map(([item, quantity]) => (
                  <li key={item} className="flex items-center justify-between border-b py-2">
                    <span>{item}: {quantity}</span>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="border p-1 rounded w-16"
                        placeholder="Update"
                        onChange={(e) => setInventoryInput({ ...inventoryInput, [item]: e.target.value })}
                      />
                      <button
                        className="bg-green-500 text-white p-1 rounded ml-2"
                        onClick={() => updateInventoryItem(item)}
                      >
                        Update
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>
            <div className="bg-white rounded-lg shadow-md p-4">
              <table className="w-full mt-2 border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Pizza Name(s) & Customizations</th>
                    <th className="border p-2">Total Amount</th>
                    <th className="border p-2">Delivery Address</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border p-2">
                        {order.pizzas.map((pizza) => (
                          <div key={pizza.name}>
                            {pizza.name} (Customizations: {pizza.customizations?.join(', ') || 'None'})
                          </div>
                        ))}
                      </td>
                      <td className="border p-2">${order.totalAmount.toFixed(2)}</td>
                      <td className="border p-2">{order.deliveryAddress}</td>
                      <td className="border p-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="border p-1 rounded"
                        >
                          <option value="Ordered">Ordered</option>
                          <option value="In Kitchen">In Kitchen</option>
                          <option value="Sent to Delivery">Sent to Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
