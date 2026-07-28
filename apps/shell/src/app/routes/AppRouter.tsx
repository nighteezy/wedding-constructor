import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/home";

const Invitation = React.lazy(() => import("invitation/App"));

export function AppRouter() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invitation/*" element={<Invitation />} />
      </Routes>
    </Suspense>
  );
}
