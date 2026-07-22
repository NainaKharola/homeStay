import React from 'react'
import { Button } from './index'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-slate-100 sm:p-10">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-red-50 text-3xl text-red-600 mb-6">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Something went wrong</h1>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              We encountered an unexpected rendering error. Please try reloading the page or resetting your local settings if the issue persists.
            </p>
            {this.state.error && (
              <pre className="mt-4 max-h-32 overflow-auto rounded-xl bg-slate-50 p-3 text-left font-mono text-[10px] text-red-600 border border-slate-100">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={this.handleReload} text="Reload Page" />
              <Button
                onClick={() => {
                  localStorage.clear()
                  window.location.href = '/'
                }}
                text="Reset App"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
