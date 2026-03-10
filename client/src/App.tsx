import { useState } from "react";
import VideoTemplate from "@/components/video/VideoTemplate";
import { CatSelection } from "@/components/CatSelection";
import type { CatChoice } from "@/lib/cats";

export default function App() {
  const [selectedCat, setSelectedCat] = useState<CatChoice | null>(null);

  if (!selectedCat) {
    return <CatSelection onSelect={setSelectedCat} />;
  }

  return <VideoTemplate selectedCat={selectedCat} />;
}

