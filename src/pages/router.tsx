import { HashRouter, Navigate, Routes, Route, Link } from "react-router-dom";
import Login from "@/components/Auth/Login";

import Welcome from "@/components/Welcome/Welcome";
import ImportExisiting from "@/components/wallet/import-exisiting";
import WalletHome from "@/components/wallet/wallet-home";
import HomePage from "@/components/Home/Home";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import NewPassword from "@/components/Auth/NewPassword";
import EnterRecoveryPhrase from "@/components/Auth/EnterRecoveryPhrase";
import Signup from "@/components/Auth/Signup";




export default function Router() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WalletHome />} />
          <Route index path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/import-existing" element={<ImportExisiting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-new" element={<WalletHome />} />
          <Route
            path="/enter-recovery-phrase"
            element={<EnterRecoveryPhrase />}
          />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
