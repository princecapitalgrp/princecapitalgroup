import React from 'react';
import { useSaveEmail } from "@/hooks/useSupabase";

const Academy = () => {
  const { saveEmail, loading, error: saveError, success } = useSaveEmail();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = (formData.get('email') as string).trim();
    if (!email) return;

    const searchParams = new URLSearchParams(window.location.search);
    const ref = searchParams.get('ref') ?? 'direct';

    await saveEmail(email.toLowerCase(), ref);
  };

  const errorStyle: React.CSSProperties = {
    color: "#F7F8FA",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
    fontFamily: "'IBM Plex Mono', monospace",
    opacity: 0.84,
  };

  const successStyle: React.CSSProperties = {
    color: "#F7F8FA",
    fontSize: "1rem",
    marginTop: "1rem",
    textAlign: "center",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: "600",
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#1A2332] text-[#F7F8FA] p-8">
      <h1 
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        PCG Academy — First Access
      </h1>
      <p 
        className="text-lg mb-8 max-w-xl text-center"
        style={{ color: "#F7F8FA", fontFamily: "'IBM Plex Sans', sans-serif", opacity: 0.86 }}
      >
        A systematic FX trading curriculum built on three years of documented
        methodology. We're building it for the right people first.
      </p>

      {success ? (
        <div style={successStyle}>
          You're on the list.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            disabled={loading}
            className="w-full p-4 rounded mb-2 bg-[#3A3F47] text-[#F7F8FA] border border-transparent focus:border-[#B8965A] focus:outline-none transition-all"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          />
          
          {saveError && <div style={errorStyle}>{saveError}</div>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#B8965A] text-[#1A2332] font-bold py-3 px-6 rounded transition-opacity uppercase tracking-widest text-sm hover:opacity-90"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {loading ? "Processing..." : "Get Access"}
          </button>
        </form>
      )}

      <p className="mt-12 text-sm text-center">
        <a
          href="https://antoniogrillobalen.substack.com"
          className="underline transition-opacity hover:opacity-90"
          style={{ color: "#B8965A", fontFamily: "'IBM Plex Mono', monospace" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the free process memos →
        </a>
      </p>

      <p 
        className="mt-6 text-sm italic opacity-60 text-center"
        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        120+ documented trades. 5-Factor Confluence System. Process over performance.
      </p>
    </section>
  );
};

export default Academy;
