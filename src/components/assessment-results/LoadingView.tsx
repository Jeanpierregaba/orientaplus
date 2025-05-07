
import React from "react";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LoadingView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-aaf-blue" />
          <h2 className="mt-4 text-lg font-medium">Chargement des résultats...</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingView;
