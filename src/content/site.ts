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
  url: "https://chakravarthy.dev",
  available: true,
  availableLabel: "Open to opportunities",
  tagline:
    "I architect secure, gas-optimized smart contracts and cross-chain infrastructure across EVM, Solana and Hyperledger.",
  summary:
    "Certified Blockchain Developer with 2+ years specializing in architecting secure smart contracts and dApps across EVM, Solana and Hyperledger ecosystems. Proficient in Solidity and Rust (Anchor) with deep expertise in Hardhat, Web3.js and Ethers.js. Experienced in building gas-optimized DeFi protocols, DAOs, NFT marketplaces, LayerZero protocols and Real-World Asset (RWA) tokenization platforms.",
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
};

export const metrics: Metric[] = [
  {
    value: 15,
    prefix: "",
    suffix: "+",
    label: "Projects worked on",
    sub: "Client & personal builds",
  },
  {
    value: 0,
    prefix: "",
    suffix: "",
    label: "Critical vulnerabilities",
    sub: "Across all shipped contracts",
  },
  {
    value: 1,
    prefix: "$",
    suffix: "M+",
    label: "Daily bridge volume",
    sub: "Cross-chain infrastructure",
  },
  {
    value: 50,
    prefix: "30–",
    suffix: "%",
    label: "Gas cost reduced",
    sub: "Assembly & storage packing",
  },
  {
    value: 200,
    prefix: "",
    suffix: "K+",
    label: "NFTs migrated",
    sub: "Flow (Cadence) → Base L2",
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
