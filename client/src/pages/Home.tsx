import { useState } from "react";
import AuthModal from "../components/modals/AuthModal";

const Home = () => {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>

      <button
        onClick={() => setOpenAuth(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Login / Sign Up
      </button>

      {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
    </div>
  );
};

export default Home;
