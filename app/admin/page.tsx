import React from "react";
import SearchBanner from "./components/SearchBanner";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center">
      <Link
        href={"/admin/search/clients"}
        className={`w-full max-w-sm transition-all border rounded text-sm border-primary-600 bg-primary-600 text-white font-bold px-4 py-3.5 `}
      >
        Search Clients 🧑‍💻
      </Link>
      <Link
        href={"/admin/search/customers"}
        className={`w-full max-w-sm transition-all border rounded text-sm border-primary-600 bg-primary-600 text-white font-bold px-4 py-3.5 `}
      >
        Search Customers 💼
      </Link>
    </div>
  );
}
