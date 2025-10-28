import CosmicBackground from '../CosmicBackground';

export default function CosmicBackgroundExample() {
  return (
    <div className="relative w-full h-screen bg-background">
      <CosmicBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-foreground text-2xl">Cosmic Background Effect</p>
      </div>
    </div>
  );
}
