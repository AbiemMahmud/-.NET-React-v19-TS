import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] max-w-175 gap-7.5 my-30 mx-auto">
      <div className="flex flex-col text-center">
        <h1 className="text-primary text-[40px] font-pacifico font-normal">
          Padre Gino's
        </h1>
        <p className="text-secondary font-bold text-[40px] uppercase max-w-78.75 mx-auto">
          Pizza & Art at a location near you
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center gap-2.5">
        <li className=" w-full max-w-62.5 text-center">
          <Link to="/order" className="btn w-full max-w-62.5 text-center">
            Order
          </Link>
        </li>
        <li className=" w-full max-w-62.5 text-center">
          <Link to="/past" className="btn w-full max-w-62.5 text-center">
            Past Orders
          </Link>
        </li>
        <li className=" w-full max-w-62.5 text-center">
          <Link to="/contact" className="btn w-full max-w-62.5 text-center">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
