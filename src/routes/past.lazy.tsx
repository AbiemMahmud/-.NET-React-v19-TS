import { useState } from "react";
import { skipToken, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  const [page, setPage] = useState(1); // tidak perlu generic, karena sudah inference dari default
  const [focusedOrder, setFocusedOrder] = useState<number>();
  const { isLoading, data } = useQuery({
    // generic untuk return data
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  // isLoading dan pastOrderData hanya alias
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    // skip token akan skip query jika focusedOrder tidak memiliki nilai / false
    queryFn: focusedOrder ? () => getPastOrder(focusedOrder) : skipToken,
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
  });

  if (isLoading) {
    return (
      <div className="min-h-162.5 max-w-225 w-9/10 mx-auto">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if (!data) {
    // narrowing, menolak jika data gagal di load
    throw new Error("Past orders could not be loaded");
  }
  const tdClass = "py-3 px-3.75";
  return (
    <div className="min-h-162.5 max-w-225 sm:w-9/10 mx-auto">
      <table className="w-full border-collapse my-6.25 text-[0.9em] font-sans min-w-100 border border-[#dddddd]">
        <thead>
          <tr className="bg-secondary text-white text-left">
            <td className={tdClass}>ID</td>
            <td className={tdClass}>Date</td>
            <td className={tdClass}>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr
              key={order.order_id}
              className="border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary"
            >
              <td className={`${tdClass} w-0 min-w-fit sm:w-fit`}>
                <button
                  className="btn"
                  onClick={() => setFocusedOrder(order.order_id)}
                >
                  {order.order_id}
                </button>
              </td>
              <td className={tdClass}>{order.date}</td>
              <td className={tdClass}>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-evenly">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <div className="font-pacifico text-primary text-[20px]">{page}</div>
        <button
          className="btn"
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {pastOrderData ? ( // narrowing untuk order detail, menampilkan loading jika data belum diload
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table className="w-full border-collapse my-6.25 text-[0.9em] font-sans min-w-100 border border-[#dddddd]">
              <thead>
                <tr className="bg-secondary text-white text-left">
                  <td className={tdClass}>Image</td>
                  <td className={tdClass}>Name</td>
                  <td className={tdClass}>Size</td>
                  <td className={tdClass}>Quantity</td>
                  <td className={tdClass}>Price</td>
                  <td className={tdClass}>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td className={tdClass}>
                      <img
                        className="w-12.5"
                        src={pizza.image}
                        alt={pizza.name}
                      />
                    </td>
                    <td className={tdClass}>{pizza.name}</td>
                    <td className={tdClass}>{pizza.size}</td>
                    <td className={tdClass}>{pizza.quantity}</td>
                    <td className={tdClass}>{intl.format(pizza.price)}</td>
                    <td className={tdClass}>{intl.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button className="btn" onClick={() => setFocusedOrder(undefined)}>
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}
