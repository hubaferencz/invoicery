"use client";

import React, { useState } from "react";
import SearchBanner from "./SearchBanner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Client = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
};

export default function ClientsPage() {
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<{
    name: string;
    phone: string;
    email: string;
  }>({ name: "", phone: "", email: "" });

  const supabase = createClient();

  const normalizePhoneNumber = (phone: string) =>
    phone.replace(/[^\d]/g, ""); // Remove non-numeric characters

  const handleSearch = async ({
    name,
    phone,
    email,
  }: {
    name: string;
    phone: string;
    email: string;
  }) => {
    setLoading(true);
    setError(null);
    setSearchQuery({ name, phone, email }); // Store the search query for highlighting

    try {
      const normalizedPhone = normalizePhoneNumber(phone);

      let query = supabase
        .from("clients")
        .select("id, first_name, last_name, phone, email");

      // Name search (combined first_name and last_name for full-name support)
      if (name) {
        const nameParts = name.split(" ").filter(Boolean); // Split into individual words
        if (nameParts.length > 1) {
          // If searching for a full name
          const [firstName, lastName] = nameParts;
          query = query.or(
            `first_name.ilike.%${firstName}%,last_name.ilike.%${lastName}%`
          );
        } else {
          // If searching for a single name
          query = query.or(
            `first_name.ilike.%${name}%,last_name.ilike.%${name}%`
          );
        }
      }

      // Phone search
      if (normalizedPhone) {
        query = query.ilike("phone", `%${normalizedPhone}%`);
      }

      // Email search
      if (email) {
        query = query.ilike("email", `%${email}%`);
      }

      const { data, error } = await query;

      if (error) {
        setError("Failed to fetch search results.");
        console.error(error.message);
      } else {
        setSearchResults(
          data.map((client) => ({
            id: client.id,
            full_name: `${client.first_name || "N/A"} ${client.last_name || ""}`,
            phone: normalizePhoneNumber(client.phone || ""),
            email: client.email,
          }))
        );
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
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
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
        placeholders={["Client name", "Phone number", "E-mail"]}
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
          {searchResults.map((client, index) => (
            <li
              key={client.id}
              className="p-6 flex items-center justify-between gap-6 bg-white"
            >
              <div className="flex items-center gap-6">
                <div className="text-sm rounded-full text-black font-medium border-[#E3E3E3] border w-7 h-7 flex items-center justify-center">
                  <span>{index + 1}</span>
                </div>
                <span className="text-sm text-[#808080] font-medium">
                  {highlightText(client.full_name, searchQuery.name)}
                </span>
                <div className="w-px h-12 bg-[#EBEBEB]"></div>
                <span className="text-sm text-[#808080] font-medium">
                  {highlightText(client.phone, normalizePhoneNumber(searchQuery.phone))}
                </span>
                <div className="w-px h-12 bg-[#EBEBEB]"></div>
                <span className="text-sm text-[#808080] font-medium">
                  {highlightText(client.email, searchQuery.email)}
                </span>
              </div>
              <Link
                href={`/admin/search/clients/${client.id}`}
                className="h-full rounded hover:bg-neutral-100 transition-all text-black border border-[#808080] px-6 flex items-center justify-center"
              >
                <span>Open client</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
