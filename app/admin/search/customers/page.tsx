"use client";

import React, { useState } from "react";
import SearchBanner from "./SearchBanner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Customer = {
  id: string;
  full_name: string;
  vat_or_company_nr: string;
  email: string;
};

export default function CustomersPage() {
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<{
    name: string;
    vatNumber: string;
    email: string;
  }>({ name: "", vatNumber: "", email: "" });

  const supabase = createClient();

  const normalizeInput = (input: string) =>
    input.trim().replace(/\s+/g, " ").toLowerCase(); // Trim, collapse spaces, and lowercase

  const handleSearch = async ({
    name,
    vatNumber,
    email,
  }: {
    name: string;
    vatNumber: string;
    email: string;
  }) => {
    setLoading(true);
    setError(null);
    setSearchQuery({ name, vatNumber, email }); // Store the search query for highlighting

    try {
      // Start building the Supabase query
      let query = supabase
        .from("customers")
        .select("id, full_name, vat_or_company_nr, email");

      // Add filters to the query
      if (name) {
        const normalizedName = normalizeInput(name);
        query = query.ilike("full_name", `%${normalizedName}%`);
      }

      if (vatNumber) {
        const normalizedVatNumber = normalizeInput(vatNumber);
        query = query.ilike("vat_or_company_nr", `%${normalizedVatNumber}%`);
      }

      if (email) {
        const normalizedEmail = normalizeInput(email);
        query = query.ilike("email", `%${normalizedEmail}%`);
      }

      // Execute the query
      const { data, error } = await query;

      if (error) {
        setError("Failed to fetch search results.");
        console.error(error.message);
      } else {
        // Check for null or undefined data
        if (!data || !Array.isArray(data)) {
          setError("No data returned from the database.");
        } else {
          // Map and normalize data
          setSearchResults(
            data.map((customer) => ({
              id: customer.id,
              full_name: customer.full_name || "N/A",
              vat_or_company_nr: customer.vat_or_company_nr || "N/A",
              email: customer.email || "N/A",
            }))
          );
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }

    setLoading(false);
  };

  const highlightText = (text: string, query: string): JSX.Element | string => {
    if (!query) return text;

    try {
      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi"
      );
      const parts = text.split(regex);

      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <span key={index} className="bg-yellow-200">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    } catch (e) {
      return text; // Fallback in case of invalid regex
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <SearchBanner
        placeholders={["Customer name", "VAT/Company number", "E-mail"]}
        onSearch={handleSearch}
      />
      <div className="flex flex-col w-full flex-1 overflow-y-scroll">
        {/* Header */}
        <div className="flex w-full bg-white border-b border-[#F2F2F2] p-6">
          <h2 className="text-[#808080] font-semibold text-base">
            {loading
              ? "Loading..."
              : error
              ? error
              : `${searchResults.length} results found`}
          </h2>
        </div>
        {/* List */}
        <ul className="flex flex-col gap-2">
          {searchResults.map((customer, index) => (
            <li
              key={customer.id}
              className="p-6 flex items-center justify-between gap-6 bg-white"
            >
              <div className="flex items-center gap-6">
                <div className="text-sm rounded-full text-black font-medium border-[#E3E3E3] border w-7 h-7 flex items-center justify-center">
                  <span>{index + 1}</span>
                </div>
                <span className="text-sm text-[#808080] font-medium">
                  {highlightText(customer.full_name, searchQuery.name)}
                </span>
                <div className="w-px h-12 bg-[#EBEBEB]"></div>
                <span className="text-sm text-[#808080] font-medium">
                  {highlightText(
                    customer.vat_or_company_nr,
                    searchQuery.vatNumber
                  )}
                </span>
                <div className="w-px h-12 bg-[#EBEBEB]"></div>
                <span className="text-sm text-[#808080] font-medium">
                  {highlightText(customer.email, searchQuery.email)}
                </span>
              </div>
              <Link
                href={`/admin/search/customers/${customer.id}`}
                className="h-full rounded hover:bg-neutral-100 transition-all text-black border border-[#808080] px-6 flex items-center justify-center"
              >
                <span>Open customer</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
