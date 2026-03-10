import { useState } from "react";
import VideoTemplate from "@/components/video/VideoTemplate";
import { CatSelection } from "@/components/CatSelection";
import { VideoGenerationScreen } from "@/components/VideoGenerationScreen";
import type { CatChoice } from "@/lib/cats";
import type { GeneratedVideos } from "@/lib/videoGeneration";

type AppState =
  | { step: 'select' }
  | { step: 'generate'; catId: CatChoice }
  | { step: 'play'; catId: CatChoice; videos: GeneratedVideos | null };

export default function App() {
  const [state, setState] = useState<AppState>({ step: 'select' });

  if (state.step === 'select') {
    return (
      <CatSelection
        onSelect={(catId) => setState({ step: 'generate', catId })}
      />
    );
  }

  if (state.step === 'generate') {
    return (
      <VideoGenerationScreen
        catId={state.catId}
        onComplete={(videos) =>
          setState({ step: 'play', catId: state.catId, videos })
        }
        onSkip={() =>
          setState({ step: 'play', catId: state.catId, videos: null })
        }
      />
    );
  }

  return (
    <VideoTemplate
      selectedCat={state.catId}
      generatedVideos={state.videos}
    />
  );
}
