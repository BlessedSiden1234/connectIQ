
export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        {children}
      </div>
    </div>
  );
}
