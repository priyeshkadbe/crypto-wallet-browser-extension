import { HashRouter, Navigate, Routes, Route, Link } from "react-router-dom";
import Login from "@/components/Auth/Login";

import Welcome from "@/components/Welcome/Welcome";
import ImportExisiting from "@/components/wallet/import-exisiting";
import WalletHome from "@/components/wallet/wallet-home";
import HomePage from "@/components/Home/Home";




export default function Router() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route index path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/import-existing" element={<ImportExisiting />} />
          <Route path="/create-new" element={<WalletHome />} />

        </Routes>
      </HashRouter>
    </div>
  );
}
