import StyleGuideForm from "@/components/style-guide/style-guide-form";

export default function StyleGuidePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI Style Guide
        </h1>
        <p className="text-muted-foreground text-purple-200/80">
          Analyze the visual identity of any YouTube channel.
        </p>
      </div>

      {/* Style Guide Form Component */}
      <StyleGuideForm />
    </div>
  );
}
