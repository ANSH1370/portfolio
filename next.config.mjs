/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The fine-tuning write-up is a self-contained static page in
  // public/fine-tuning-field-notes/. Next serves files from public/ by exact
  // path only — it does not resolve a directory to its index.html — so map the
  // clean URL onto the file. (Requests with a trailing slash 308 to this one.)
  async rewrites() {
    return [
      {
        source: "/fine-tuning-field-notes",
        destination: "/fine-tuning-field-notes/index.html",
      },
    ];
  },
};

export default nextConfig;
