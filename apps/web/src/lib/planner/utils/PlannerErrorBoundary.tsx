'use client';
import React, { ReactNode, Component, ErrorInfo } from 'react';
import { Icon } from '../../../components/icons/Icon';
import { Button } from '../../../components/ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface PlannerErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class PlannerErrorBoundary extends Component<
  PlannerErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: PlannerErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[PlannerErrorBoundary]', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Icon name="AlertTriangle" size={24} className="text-destructive" />
          </div>
          <h3 className="font-bold text-lg mb-2">Something went wrong</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            {this.state.error?.message ?? 'An unexpected error occurred in the Planner.'}
          </p>
          <Button onClick={this.handleRetry} variant="outline">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
