export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "SoluLab",
    title: "Blockchain Developer",
    location: "Ahmedabad, Gujarat",
    period: "Jul 2024 — Present",
    current: true,
    points: [
      "Built 10+ production smart contracts across Ethereum, Solana and Layer-2 solutions with zero critical vulnerabilities.",
      "Developed full-stack DeFi protocols including AMM DEXs, lending platforms, staking and vesting systems and DAOs.",
      "Implemented cross-chain infrastructure with bridge protocols handling $1M+ daily transaction volume.",
      "Optimized gas costs by 30–50% through advanced Solidity patterns and assembly code optimization.",
    ],
  },
  {
    company: "IIT Kanpur",
    title: "Internship & Certification Program",
    location: "Kanpur",
    period: "Apr 2022 — Nov 2022",
    current: false,
    points: [
      "Worked alongside IIT professionals on live projects over a six-month program.",
      "Built foundations in smart contract security practices and comprehensive testing methodologies.",
    ],
  },
];
