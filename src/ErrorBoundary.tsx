// mostly code from reactjs.org/docs/error-boundaries.html
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

// generic dari class component adalah props
class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false }; // sudah inference
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // tipe Error bawaan dari TS, ErrorInfo berisi componentStack
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
