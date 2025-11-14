import React, { useState } from "react";

// LoginPage.jsx
// Default-exported React component. Styled with Tailwind CSS.
// Features:
// - Email + Password fields with client-side validation
// - "Show password" toggle
// - "Remember me" checkbox
// - Accessible labels and error messages (aria-* attributes)
// - Social login buttons (UI only)
// - Clean, responsive layout using Tailwind utility classes

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";

    if (!password) errs.password = "Password required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    // Simulate login request. Replace with real API call (fetch/axios) in your app.
    try {
      setLoading(true);
      // Example with fetch (uncomment and change URL when integrating):
      /*
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      onLogin?.(data);
      */

      // Demo delay
      await new Promise((r) => setTimeout(r, 900));
      // Demo success: call onLogin with fake token
      onLogin?.({ token: "demo-token", user: { email } });
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back — please enter your details to continue.
          </p>
        </div>

        <form
          className="mt-8 space-y-6 bg-white p-6 rounded-2xl shadow-md"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600" id="password-error">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-lg shadow-sm text-sm font-medium hover:bg-gray-50"
              >
                {/* Replace with icons as needed */}
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-lg shadow-sm text-sm font-medium hover:bg-gray-50"
              >
                <span>Continue with GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </form>

        <footer className="text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
