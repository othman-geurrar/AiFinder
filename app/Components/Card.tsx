import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { AIToolCardProps } from "@/types";
import Image from "next/image";

const AIToolCard: React.FC<AIToolCardProps> = ({ tool }) => {
  const [logoSource, setLogoSource] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        // Use dynamic import to load the logo
        const logo = await import(`@/app/assets/ai-logo/${tool.name}.png`);
        setLogoSource(logo.default); // Set the logo source
      } catch {
        setLogoSource(null); // If the import fails, set to null
      }
    };

    loadLogo(); // Call the function to load the logo
  }, [tool.name]);

  return (
    <div className="overflow-hidden transition-all hover:shadow-lg rounded-lg">
      <div className={`bg-gradient-to-r ${tool.color} p-6`}>
        <div className="flex items-center space-x-4">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 w-14 h-14 flex items-center justify-center">
            {logoSource ? (
              <Image
                alt={`${tool.name} logo`}
                className="rounded-full object-cover"
                src={logoSource}
                width={50}
                height={50}
              />
            ) : (
              <span className="text-xl font-bold text-purple-700">
                {tool.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
            <p className="text-gray-200 dark:text-gray-300">{tool.category}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-900 dark:text-gray-300">{tool.description}</p>
      </div>
      <div className="p-6 dark:bg-gray-800/50">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 py-2 px-4 rounded-lg flex items-center justify-center`}
        >
          Visit Website
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export { AIToolCard };
