export const site = {
  name: "Chakravarthy Naik M",
  shortName: "Chakravarthy Naik",
  initials: "CN",
  role: "Blockchain Developer",
  location: "Hyderabad, TG",
  email: "Chakravarthynaik101@gmail.com",
  phone: "+91 9000063183",
  github: "https://github.com/Chakri1407",
  linkedin: "https://www.linkedin.com/in/chakravarthyn1407",
  resume: "/ChakravarthyN_Resume.pdf",
  // The public production alias. Drives canonical URLs, the sitemap, and the
  // absolute og:image that LinkedIn/WhatsApp fetch. Must be a domain you own
  // and that is publicly reachable -- update if you add a custom domain.
  url: "https://chakravarthynaik.vercel.app",
  available: true,
  availableLabel: "Open to opportunities",
  tagline:
    "I architect secure, gas-optimized smart contracts and cross-chain infrastructure across EVM, Solana and Hyperledger.",
  summary:
    "Certified Blockchain Developer with 2.5+ years specializing in architecting secure smart contracts and dApps across EVM, Solana and Hyperledger ecosystems. Proficient in Solidity and Rust (Anchor) with deep expertise in Hardhat, Web3.js and Ethers.js. Experienced in building gas-optimized DeFi protocols, DAOs, NFT marketplaces, LayerZero protocols and Real-World Asset (RWA) tokenization platforms.",
  roles: [
    "Blockchain Developer",
    "Smart Contract Engineer",
    "Solidity · Rust (Anchor)",
    "DeFi & RWA Protocols",
  ],
} as const;

export type Metric = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  sub: string;
  /** Compact form for the social card, where space is tight. */
  short: string;
};

export const metrics: Metric[] = [
  {
    value: 15,
    prefix: "",
    suffix: "+",
    label: "Projects worked on",
    sub: "Client & personal builds",
    short: "15+ projects",
  },
  {
    value: 0,
    prefix: "",
    suffix: "",
    label: "Critical vulnerabilities",
    sub: "Across all shipped contracts",
    short: "0 critical vulns",
  },
  {
    value: 1,
    prefix: "$",
    suffix: "M+",
    label: "Daily bridge volume",
    sub: "Cross-chain infrastructure",
    short: "$1M+ daily volume",
  },
  {
    value: 50,
    prefix: "30–",
    suffix: "%",
    label: "Gas cost reduced",
    sub: "Assembly & storage packing",
    short: "30–50% gas saved",
  },
  {
    value: 200,
    prefix: "",
    suffix: "K+",
    label: "NFTs migrated",
    sub: "Flow (Cadence) → Base L2",
    short: "200K+ NFTs migrated",
  },
];

export const chains = [
  "Ethereum",
  "Solana",
  "Base",
  "Arbitrum",
  "Optimism",
  "Polygon",
  "BNB Chain",
  "Avalanche",
  "Hyperledger",
] as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Stack", href: "/#stack" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;
