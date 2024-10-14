import React from "react";
import { AIToolCard } from "@/app/Components/Card";
import { SearchResponse } from "@/types";

interface SearchResultsProps {
  results: SearchResponse;
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mt-8">
      {results.explanation && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            AI Assistant Suggestions
          </h2>
          <p className="text-gray-700">{results.explanation}</p>
        </div>
      )}

      {results.categories && results.categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Related Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {results.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.tools &&
          results.tools.map((tool, index) => (
            <AIToolCard
              key={index}
              tool={{
                name: tool.name,
                category: tool.category,
                description: tool.description,
                logo: "/api/placeholder/64/64", // Adjust logo if dynamic
                color: "from-blue-500 to-purple-500",
                url: tool.url,
              }}
            />
          ))}
      </div>
    </div>
  );
}
