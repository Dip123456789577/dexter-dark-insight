import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { type ReactNode } from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-on-surface">Case file missing</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          The evidence you're looking for has been redacted or moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-crimson px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-glow"
          >
            Return to file
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-on-surface">
          Signal lost.
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          The transmission was interrupted. Try again or return to the case file.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-crimson px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-glow"
          >
            Retry
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-outline-variant px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-on-surface transition-colors hover:bg-surface-high"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: any }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return <Outlet />;
}
