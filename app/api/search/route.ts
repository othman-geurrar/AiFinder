import axios from "axios";
import { NextResponse } from "next/server";
import type { SearchResponse } from "@/types";

const SYSTEM_PROMPT = `You are an AI tool recommendation expert. For each query, recommend relevant AI tools with accurate, up-to-date information. Include only real, existing tools with correct URLs. Focus on providing practical, useful suggestions.`;

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    const options = {
      method: "POST",
      url: "https://chatgpt-42.p.rapidapi.com/gpt4",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Given this query about AI tools: "${query}"
            Return a JSON object with:
            1. Relevant categories
            2. 6-10 most relevant AI tools with details
            3. Brief explanation of recommendations
            
            Format exactly as:
            {
              "categories": ["category1", "category2"],
              "tools": [
                {
                  "name": "Tool Name",
                  "description": "Brief, accurate description",
                  "category": "primary category",
                  "url": "correct website url",
                  "relevance": "specific reason why this tool matches the query"
                }
              ],
              "explanation": "brief explanation of why these tools were chosen"
            }`,
          },
        ],
        web_access: false,
      },
    };

    const response = await axios.request(options);
    const responseContent = response.data.result;

    if (!responseContent) {
      throw new Error("Empty response from RapidAPI");
    }

    // Try to parse the response as JSON
    let responseData: SearchResponse;
    try {
      responseData = JSON.parse(responseContent);
    } catch (error) {
      // Assert that error is of type Error
      throw new Error(`Failed to parse response as JSON: ${(error as Error).message}`);
    }

    // Add placeholder logos
    const enhancedTools = responseData.tools?.map((tool, index) => ({
      ...tool,
      id: index + 1,
      logo: "/api/placeholder/64/64",
    }));

    return NextResponse.json({
      ...responseData,
      tools: enhancedTools,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process search request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
