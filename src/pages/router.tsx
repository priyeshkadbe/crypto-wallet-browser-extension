import { HashRouter, Navigate, Routes, Route, Link } from "react-router-dom";
import Login from "@/components/Auth/Login";

import ImportExisiting from "@/components/wallet/import-exisiting/index";
import WalletHome from "@/components/wallet/wallet-home";
import HomePage from "@/components/Home/Home";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import NewPassword from "@/components/Auth/NewPassword";
import EnterRecoveryPhrase from "@/components/Auth/EnterRecoveryPhrase";
import Signup from "@/components/Auth/Signup";
import AddNewNetwork from "@/components/Networks/AddNewNetwork";
import Password from "@/components/wallet/password";




export default function Router() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
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
          {/* <Route path="/add-new-network" element={<AddNewNetwork/>} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}
