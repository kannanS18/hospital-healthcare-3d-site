import React from 'react';
import { AlertCircle } from 'lucide-react';

export class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Canvas 3D Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 text-2xl">
            🩺
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            Dr. Maya Thorne, MD • 3D Mascot Loading
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            WebGL is initializing in your browser. Move your mouse or refresh to interact with the doctor model.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-3 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
          >
            Reload 3D Mascot
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
