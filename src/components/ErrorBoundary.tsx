import React from "react";
import { Button } from "./ui/button";
import Header from "./Header";

type State = { hasError: boolean; error?: Error | null };

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log error to console for now — can wire to telemetry later
    // eslint-disable-next-line no-console
    console.error("Captured render error:", error, info);
  }

  componentDidUpdate(prevProps: React.PropsWithChildren<{}>) {
    // If the children changed (e.g. navigation), try to recover and re-render.
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background">
          <Header onLogout={() => {}} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="border rounded-lg p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
              <p className="text-muted-foreground mb-4">An unexpected error occurred while rendering this page.</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => this.setState({ hasError: false, error: null })}>
                  Try Again
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    try {
                      window.history.pushState({}, "", "/dashboard");
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    } catch {
                      // fallback to full reload if history manipulation fails
                      window.location.href = "/dashboard";
                    }
                  }}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
