import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Aside from "./components/Aside";
import Auth from "./components/Auth";
import OwnerDetails from "./components/OwnerDetails";
import TenantDetails from "./components/TenantDetails";
import CreatingOwner from "./components/CreatingOwner";
import CreatingParkingSlot from "./components/CreatingParkingSlot";
import ComplaintsViewer from "./components/ComplaintsViewer";
import RaisingComplaints from "./components/RaisingComplaints";
import ParkingSlot from "./components/ParkingSlot";
import PayMaintenance from "./components/PayMaintenance";
import CreatingTenant from "./components/CreatingTenant";
import RoomDetails from "./components/RoomDetails";
import ErrorPage from "./ErrorPage";
import ComplaintsViewerOwner from "./components/ComplaintsViewerOwner";
import RoomDetailsOwner from "./components/RoomDetailsOwner";
import UnpaidTenants from "./components/UnpaidTenants";
import DeletingOwner from "./components/DeletingIdentity";

function App() {
  const forAdmin = [
    "Tenant Details",
    "Unpaid Tenant Details",
    "Owner Details",
    "Create owner",
    "Allotting Parking slot",
    "Complaints",
  ];
  const forEmployee = ["Complaints"];
  const forTenant = [
    "Raising Complaints",
    "Alloted Parking slot",
    "Pay maintenance",
  ];
  const forOwner = [
    "Tenant details",
    "Complaint",
    "Create Tenant",
    "Room Details",
    "Unpaid tenant details",
    "Delete identity",
  ];

  return (
    <div className="App font-mons bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <main>
              <Header forHam={[...forAdmin, "Logout"]} />
              <section className="flex pt-16">
                <Aside forHam={forAdmin} />
                <div className="flex-1 pl-64">
                  <Dashboard />
                </div>
              </section>
            </main>
          }
        />
        <Route
          path="/employee"
          element={
            <main>
              <Header forHam={[...forEmployee, "Logout"]} />
              <section className="flex pt-16">
                <Aside forHam={forEmployee} />
                <div className="flex-1 pl-64">
                  <Dashboard />
                </div>
              </section>
            </main>
          }
        />
        <Route
          path="/tenant"
          element={
            <main>
              <Header forHam={[...forTenant, "Logout"]} />
              <section className="flex pt-16">
                <Aside forHam={forTenant} />
                <div className="flex-1 pl-64">
                  <Dashboard />
                </div>
              </section>
            </main>
          }
        />
        <Route
          path="/owner"
          element={
            <main>
              <Header forHam={[...forOwner, "Logout"]} />
              <section className="flex pt-16">
                <Aside forHam={forOwner} />
                <div className="flex-1 pl-64">
                  <Dashboard />
                </div>
              </section>
            </main>
          }
        />
        <Route
          path="/admin/ownerdetails"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <OwnerDetails />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/tenantdetails"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <TenantDetails />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/unpaidtenantdetails"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <UnpaidTenants />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/createowner"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <CreatingOwner />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/allottingparkingslot"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <CreatingParkingSlot />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <ComplaintsViewer />
              </section>
            </main>
          }
        />
        <Route
          path="/tenant/raisingcomplaints"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="p-6 pt-20">
                <RaisingComplaints />
              </section>
            </main>
          }
        />
        <Route
          path="/tenant/allotedparkingslot"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="p-6 pt-20">
                <ParkingSlot />
              </section>
            </main>
          }
        />
        <Route
          path="/tenant/paymaintenance"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="p-6 pt-20">
                <PayMaintenance />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/tenantdetails"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-6 pt-20">
                <RoomDetailsOwner />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/complaint"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-6 pt-20">
                <ComplaintsViewerOwner />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/createtenant"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-6 pt-20">
                <CreatingTenant />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/roomdetails"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-6 pt-20">
                <RoomDetails />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/unpaidtenantdetails"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-6 pt-20">
                <UnpaidTenants />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/deleteidentity"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-6 pt-20">
                <DeletingOwner />
              </section>
            </main>
          }
        />
        <Route
          path="/employee/complaints"
          element={
            <main>
              <Header forHam={forEmployee} />
              <section className="p-6 pt-20">
                <ComplaintsViewer />
              </section>
            </main>
          }
        />
        <Route
          path="/*"
          element={
            <main>
              <ErrorPage />
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
