import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-only badge sits in the bottom-left corner, right where the nav
  // parks its floating island once you scroll. Compile and runtime errors are
  // still surfaced with this off.
  devIndicators: false,
};

export default nextConfig;
