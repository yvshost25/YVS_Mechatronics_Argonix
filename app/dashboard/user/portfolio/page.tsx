"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";

export default function PortfolioPage() {
  const [newPortfolio, setNewPortfolio] = useState({
    name: "",
    description: "",
    logo: null as File | null,
    storageId: "",
    image:null as File | null,
  });
  const [isCreating, setIsCreating] = useState(false);

  // Convex Queries & Mutations
  const addPortfolio = useMutation(api.portfolio.addPortfolio);
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);
  const portfolios = useQuery(api.portfolio.getPortfolios) || [];

  // Function to trigger file input manually
  const handleFileSelect = () => {
    document.getElementById("portfolio-logo")?.click();
  };

  const handleCreate = async () => {
    if (!newPortfolio.name || !newPortfolio.description) {
      toast("Please fill in both the name and description");
      return;
    }
    setIsCreating(true);

    try {
      let storageId = null;
      let storageId1 = null;
      if (newPortfolio.logo) {
        // Generate upload URL from Convex
        const postUrl = await generateUploadUrl();

        // Upload file to storage
        const uploadResponse = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": newPortfolio.logo.type },
          body: newPortfolio.logo,
        });

        const resultJson = await uploadResponse.json();
        storageId = resultJson.storageId;

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }
      }

      if (newPortfolio.image) {
        // Generate upload URL from Convex
        const postUrl = await generateUploadUrl();

        // Upload file to storage
        const uploadResponse = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": newPortfolio.image.type },
          body: newPortfolio.logo,
        });

        const resultJson = await uploadResponse.json();
        storageId1 = resultJson.storageId;

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }
      }
      // Save portfolio data in Convex
      await addPortfolio({
        name: newPortfolio.name,
        description: newPortfolio.description,
        storageId: storageId ?? '',
        storageId1:storageId1??'',
      });

      toast("Portfolio item created!");
      setNewPortfolio({ name: "", description: "", logo: null, storageId: "" , image:null});
    } catch (error) {
      console.error("Portfolio creation error:", error);
      toast("Failed to create portfolio item");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Creation Section */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Portfolio Management</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            placeholder="Name"
            value={newPortfolio.name}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, name: e.target.value })
            }
          />
          <Textarea
            placeholder="Description"
            value={newPortfolio.description}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, description: e.target.value })
            }
          />
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                disabled={isCreating}
                onClick={handleFileSelect} // 🔹 Manually trigger file input
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                {newPortfolio.logo ? "Change Logo" : "Upload Logo"}
              </Button>
              <input
                id="portfolio-logo"
                type="file"
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    logo: e.target.files?.[0] || null,
                  })
                }
                className="hidden"
              />
              {newPortfolio.logo && (
                <span className="text-sm text-gray-600">
                  {newPortfolio.logo.name}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                disabled={isCreating}
                onClick={handleFileSelect} // 🔹 Manually trigger file input
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                {newPortfolio.logo ? "Change Image" : "Upload Image"}
              </Button>
              <input
                id="portfolio-image"
                type="file"
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    image: e.target.files?.[0] || null,
                  })
                }
                className="hidden"
              />

              {newPortfolio.logo && (
                <span className="text-sm text-gray-600">
                  {newPortfolio?.image?.name}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          onClick={handleCreate}
          disabled={isCreating || !newPortfolio.name || !newPortfolio.description}
          className="mt-4"
        >
          {isCreating ? "Creating..." : "Create Portfolio"}
        </Button>
      </Card>

      {/* Display Portfolios */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Portfolios</h2>
        {portfolios.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Logo</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center">
                      {item.logoUrl ? (
                        <Image
                          src={item.logoUrl}
                          alt={item.name}
                          height={25}
                          width={25}
                          className="h-10 w-10 object-cover rounded-md flex justify-center"
                        />
                      ) : (
                        "No Logo"
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No portfolio items yet.</p>
        )}
      </Card>
    </div>
  );
}
