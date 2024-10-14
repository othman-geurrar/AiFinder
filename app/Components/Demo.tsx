"use client";

import { SearchResponse } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchResults } from "./SearchResults";

const Demo = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Search request failed");
      }

      const data: SearchResponse = await response.json();

      if (!data.tools || !Array.isArray(data.tools)) {
        throw new Error("Invalid response format");
      }

      setSearchResults(data);
    } catch (err) {
      // Enhanced error handling with detailed messages
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to perform search. Please try again.";
      setError(errorMessage);
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="mt-12 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center items-center"
            onSubmit={(event) => {
              event.preventDefault(); // Prevent default form submission
              handleSearch(searchTerm); // Call handleSearch with the query
            }}
          >
            <input
              type="text"
              placeholder="Ask about AI tools (e.g., 'What are the best AI tools for video editing?'"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              required
              className="url_input peer"
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                <Search />
              )}
            </button>
          </form>
        </div>
      </section>
      <div className="mt-12 w-full">
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {searchResults && <SearchResults results={searchResults} />}
      </div>
    </>
  );
};

export default Demo;
