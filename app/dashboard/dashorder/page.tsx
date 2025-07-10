"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/Components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Badge } from "@/Components/ui/badge";
import { Bell, Settings, ChevronDown, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isAfter, isBefore } from "date-fns";
import SideBar from "../Components/SideBar"; // 👈 Sidebar importée

type Product = { id: string; name: string; image: string };
type Order = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  date: string;
  price: string;
  status: string;
  statusColor: string;
  highlighted?: boolean;
  products: Product[];
};

const statusToColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-red-100 text-red-700";
    case "dispatch":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const DashOrder = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("all-orders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [tempStatus, setTempStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const ordersPerPage = 4;

  useEffect(() => {
    fetch("/api/get-orders")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const formatted = data.map((order: any) => ({
          id: "#" + order.id,
          name: order.name,
          avatar: "/profile.png",
          email: order.email,
          date: new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          price: `${order.total}FCFA`,
          status: order.status,
          statusColor: statusToColor(order.status),
          products: order.items.map((i: any) => ({
            id: i.productId,
            name: i.name,
            image: i.image,
          })),
        }));

        setOrders(formatted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedOrder) setTempStatus(selectedOrder.status);
    else setTempStatus(null);
  }, [selectedOrder]);

  const getCount = (status: string) =>
    orders.filter((o) => o.status.toLowerCase() === status.toLowerCase()).length;

  const updateStatus = async (newStatus: string) => {
    if (!selectedOrder || selectedOrder.status.toLowerCase() === "completed") return;

    try {
      const res = await fetch("/api/update-order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id.replace("#", ""),
          newStatus,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = {
        ...selectedOrder,
        status: newStatus,
        statusColor: statusToColor(newStatus),
      };

      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      setSelectedOrder(updated);
      setTempStatus(newStatus);
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const statusMatch =
      activeTab === "all-orders" || o.status.toLowerCase() === activeTab;
    const orderDate = parse(o.date, "dd MMM yyyy", new Date());
    const isWithinRange =
      (!startDate || isAfter(orderDate, startDate) || orderDate.getTime() === startDate.getTime()) &&
      (!endDate || isBefore(orderDate, endDate) || orderDate.getTime() === endDate.getTime());
    return statusMatch && isWithinRange;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixe */}
        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Contenu principal */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Orders</h1>
            <p className="text-sm text-gray-600">{orders.length} orders found</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img src="/profile.png" className="h-8 w-8 rounded-full" alt="User" />
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex justify-between items-center px-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all-orders">All ({orders.length})</TabsTrigger>
              <TabsTrigger value="dispatch">Dispatch ({getCount("dispatch")})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({getCount("pending")})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({getCount("completed")})</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Calendars */}
          <div className="flex space-x-2 items-center text-sm text-gray-500">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start date"
              className="border px-3 py-1 rounded w-[120px]"
              dateFormat="dd MMM yyyy"
            />
            <span>to</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              minDate={startDate ?? undefined}
              placeholderText="End date"
              className="border px-3 py-1 rounded w-[120px]"
              dateFormat="dd MMM yyyy"
            />
          </div>
        </div>

        {/* TABLE */}
        <Card className="mx-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">#ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3 flex items-center space-x-2">
                    <img src={order.avatar} className="h-6 w-6 rounded-full" />
                    <span>{order.name}</span>
                  </td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.price}</td>
                  <td className="p-3">
                    <Badge className={order.statusColor}>{order.status}</Badge>
                  </td>
                  <td className="p-3">
                    <Settings className="h-4 w-4 text-gray-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* PAGINATION */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className="px-3"
            >
              {i + 1}
            </Button>
          ))}
        </div>

        {/* MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] md:w-[60%] rounded-lg shadow-lg p-6 relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <h2 className="text-lg font-semibold mb-1">Order #{selectedOrder.id}</h2>
              <p className="text-sm font-semibold text-black mb-2">
                Name: <span className="text-gray-500">{selectedOrder.name}</span>
              </p>
              <p className="text-sm text-gray-500 mb-2">{selectedOrder.email}</p>
              <p className="text-sm mb-3">Total: {selectedOrder.price}</p>

              <div className="mb-3">
                <label className="text-sm">Status:</label>
                <select
                  value={tempStatus || ""}
                  onChange={(e) => setTempStatus(e.target.value)}
                  className="block border px-2 py-1 rounded mt-1"
                  disabled={selectedOrder.status.toLowerCase() === "completed"}
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatch">Dispatch</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="mt-4">
                <p className="font-medium mb-2">Ordered Products:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedOrder.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 border p-2 rounded-md"
                    >
                      <img
                        src={product.image}
                        className="w-12 h-12 object-cover rounded"
                        alt={product.name}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-right">
                <Button
                  className="bg-blue-600 text-white"
                  onClick={() => {
                    if (tempStatus && tempStatus !== selectedOrder.status) {
                      updateStatus(tempStatus);
                    }
                    setSelectedOrder(null);
                  }}
                >
                  Confirm Status
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashOrder;
