export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    items: [
      "Solidity",
      "Rust (Anchor)",
      "Hardhat",
      "Foundry",
      "OpenZeppelin",
      "Ethers.js",
      "Web3.js",
      "viem",
    ],
  },
  {
    id: "networks",
    title: "Blockchain Networks",
    items: [
      "Ethereum",
      "Solana",
      "Polygon",
      "BNB Smart Chain",
      "Optimism",
      "Base",
      "Arbitrum",
      "Avalanche",
    ],
  },
  {
    id: "defi",
    title: "DeFi Protocols & Applications",
    items: [
      "AMM DEX",
      "Lending / Borrowing",
      "Staking",
      "Vesting",
      "DAOs",
      "LayerZero",
      "Liquidity Pools",
      "Oracle Integration",
      "Cross-chain Bridges",
    ],
  },
  {
    id: "security",
    title: "Security & Token Standards",
    items: [
      "ERC-20",
      "ERC-721",
      "ERC-1155",
      "UUPS Proxy",
      "Multi-signature Wallets",
      "Foundry",
      "Slither",
      "Mythril",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
    ],
  },
  {
    id: "backend",
    title: "Backend & DevOps",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
  },
];
