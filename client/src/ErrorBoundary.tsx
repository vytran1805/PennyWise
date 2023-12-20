import React, { Component, ReactNode } from "react";

// Define props interface for the ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode; // ReactNode allows any valid JSX content as children
}

// Define state interface for the ErrorBoundary component
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize state - hasError set to false initially
    this.state = { hasError: false };
  }

  // componentDidCatch is a React lifecycle method used to catch errors in child components
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Update state to indicate that an error has occurred
    this.setState({ hasError: true });

    // Log the error and additional error information to the console
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    // If an error occurred, render a fallback UI
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    } else {
      // If no error, render the children passed to the ErrorBoundary component
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
