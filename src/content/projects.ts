export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  tagline: string;
  org: "SoluLab" | "Personal";
  period: string;
  featured: boolean;
  index: string;
  chains: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  problem: string[];
  architecture: { title: string; body: string }[];
  decisions: { title: string; body: string }[];
  security: string[];
  optimization?: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "xerovan",
    title: "Xerovan",
    subtitle: "Multi-Chain Wallet & Web3 Infrastructure",
    tagline:
      "A mobile multi-chain wallet with a best-route Send–Swap–Bridge engine and an in-app dApp browser across 10 networks.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: true,
    index: "01",
    chains: ["10 Networks", "EVM", "Solana"],
    stack: [
      "Dynamic SDK",
      "Li.Fi",
      "0x",
      "Circle CCTP",
      "Solidity",
      "viem",
      "ethers.js",
      "React Native",
      "EIP-1193",
      "EIP-6963",
      "EIP-712",
      "EIP-3326",
    ],
    metrics: [
      { value: "10", label: "Blockchain networks" },
      { value: "3", label: "Liquidity sources aggregated" },
      { value: "4", label: "EIP standards implemented" },
    ],
    problem: [
      "Multi-chain wallets usually force a choice: deep support for one ecosystem, or shallow support for many. Users end up juggling separate apps to send on one chain, swap on another and bridge between them — each hop a separate approval, a separate fee and a separate chance to get it wrong.",
      "The brief was a single mobile wallet that treats send, swap and bridge as one operation, works across ten networks, and lets users reach dApps without ever leaving the app.",
    ],
    architecture: [
      {
        title: "Wallet & session layer",
        body: "Built on the Dynamic Labs SDK to support both embedded and external wallets behind one interface. Session management is scoped per origin, so every dApp the user visits gets an isolated wallet session rather than sharing one global connection — a single compromised or misbehaving site cannot see or act on connections belonging to another.",
      },
      {
        title: "Send–Swap–Bridge routing engine",
        body: "Rather than binding to one liquidity provider, the engine queries Li.Fi, 0x and Circle's CCTP in parallel, normalizes their quotes into a common shape, and scores each candidate route on output amount, fee load and hop count. The user sees one destination amount; the routing complexity stays underneath.",
      },
      {
        title: "In-app dApp browser",
        body: "A WebView with a full EIP-1193 provider injected, plus EIP-6963 multi-provider discovery so dApps enumerate available wallets properly instead of racing for window.ethereum. EIP-3326 handles chain-switch requests from the site, keeping the wallet and the dApp in agreement about the active network.",
      },
      {
        title: "Signing & consent",
        body: "All structured signing runs through EIP-712 typed data, decoded before it reaches the user. ERC-20 and ERC-721 approval parameters are parsed out and rendered in plain language — which token, which spender, how much — so the confirmation screen describes the actual consequence rather than a hex blob.",
      },
    ],
    decisions: [
      {
        title: "Three liquidity sources, not one",
        body: "Any single aggregator has blind spots — chains it does not cover, pairs where its routing is poor, or periods of degraded uptime. Querying Li.Fi, 0x and CCTP together means the wallet degrades gracefully instead of failing, and the user reliably gets a competitive route rather than whichever one provider happened to return.",
      },
      {
        title: "CCTP for USDC specifically",
        body: "Most bridges wrap: you deposit USDC on one chain and receive a bridge-issued derivative on the other, inheriting that bridge's security as counterparty risk. CCTP burns and mints canonical USDC natively, so the user ends up holding the real asset. For the single most-bridged token, that difference is worth routing separately.",
      },
      {
        title: "EIP-6963 over window.ethereum",
        body: "The legacy injection pattern is a land grab — whichever wallet writes to window.ethereum last wins, and users with multiple wallets get unpredictable behaviour. EIP-6963 announces providers as discoverable events, letting the dApp present a real choice. Supporting it was necessary for the in-app browser to behave correctly on sites that already implement it.",
      },
      {
        title: "Decode typed data rather than display it",
        body: "Approval phishing works because users are asked to confirm something unreadable. Decoding the ERC-20 and ERC-721 consent parameters turns an opaque signature request into a sentence a person can evaluate — the cheapest meaningful defence available at the wallet layer.",
      },
    ],
    security: [
      "Per-origin wallet session isolation prevents cross-dApp connection leakage",
      "EIP-712 structured signing throughout — no blind eth_sign paths",
      "ERC-20 / ERC-721 approval parameters decoded and surfaced before confirmation",
      "Chain-switch requests validated against a supported-network allowlist (EIP-3326)",
    ],
  },
  {
    slug: "afl-mint",
    title: "AFL Mint",
    subtitle: "Flow → Base Migration",
    tagline:
      "Migrated a live digital collectibles ecosystem from Flow (Cadence) to Base, re-architecting 7 contracts while preserving 1:1 identity for 200K+ existing NFTs.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: true,
    index: "02",
    chains: ["Base", "Flow"],
    stack: [
      "Solidity",
      "Hardhat",
      "OpenZeppelin UUPS",
      "Ethers.js",
      "Base USDC",
      "Crossmint",
      "ReentrancyGuard",
      "AccessControl",
    ],
    metrics: [
      { value: "200K+", label: "Existing NFTs preserved" },
      { value: "7", label: "Cadence contracts re-architected" },
      { value: "1:1", label: "tokenId & templateId parity" },
    ],
    problem: [
      "The AFL digital collectibles ecosystem ran on Flow, written in Cadence. Moving it to Base meant more than a port — Cadence and Solidity disagree at the level of how ownership itself works, and over 200,000 NFTs were already in circulation with holders, off-chain systems and marketplace listings all depending on their existing identifiers.",
      "A migration that renumbered anything would have broken every downstream integration at once. Identity preservation was the hard constraint the rest of the design had to satisfy.",
    ],
    architecture: [
      {
        title: "Resource model → mapping model",
        body: "Cadence treats NFTs as linear resources that physically live in an account's storage and cannot be copied or implicitly discarded. Solidity has no such guarantee — ownership is a global mapping and safety is a matter of discipline. Each of the 7 Cadence contracts was re-modelled against ERC-721 semantics, with the invariants Cadence enforced at the type level reimplemented as explicit checks.",
      },
      {
        title: "Identity parity layer",
        body: "Both tokenId and templateId were carried across unchanged, so a collectible that was #4,312 of template 19 on Flow remains exactly that on Base. This kept existing holder records, metadata references and off-chain indexes valid through the migration rather than requiring a coordinated rewrite of every consuming system.",
      },
      {
        title: "Upgradeable deployment",
        body: "Contracts deploy behind OpenZeppelin UUPS proxies with AccessControl governing the upgrade path. For a migration of this size, the ability to patch without redeploying — and without asking 200K+ holders to move again — is the difference between a fixable issue and a stranded collection.",
      },
      {
        title: "Payments & onboarding",
        body: "Minting settles in native Base USDC, with Crossmint handling card payments so collectors arriving without a funded wallet can still mint. This keeps the contract surface purely crypto-native while the fiat path is handled off-chain.",
      },
    ],
    decisions: [
      {
        title: "UUPS over Transparent proxy",
        body: "The Transparent pattern pays for an admin check on every single call, forever. UUPS moves upgrade authorization into the implementation, so ordinary calls stay cheap and only upgrades carry the overhead. On an L2 with high mint volume, that per-call saving compounds across hundreds of thousands of transactions.",
      },
      {
        title: "Preserve identifiers rather than remap",
        body: "A remapping table would have been simpler to write and a permanent liability to operate — every integration, every cached URL, every holder's record would need to consult it indefinitely. Carrying identifiers across unchanged pushed complexity into the migration itself, which runs once, instead of into the system, which runs forever.",
      },
      {
        title: "Base as the target L2",
        body: "Mint-heavy collectibles are exactly the workload that mainnet pricing makes untenable. Base offers EVM equivalence — so the Cadence-to-Solidity work was not further complicated by chain-specific quirks — with native USDC and fee economics that make routine minting viable.",
      },
    ],
    security: [
      "AccessControl role separation across minting, template administration and upgrade authority",
      "ReentrancyGuard on all value-handling and mint entry points",
      "UUPS upgrade authorization gated behind an explicit admin role",
      "Migration parity verified against on-chain Flow state before cutover",
    ],
    optimization: [
      "Cadence contract logic consolidated during the port rather than translated one-to-one",
      "Storage layout packed to reduce per-mint slot writes",
      "UUPS chosen to eliminate per-call proxy admin overhead",
    ],
  },
  {
    slug: "founoun",
    title: "Founoun",
    subtitle: "NFT Marketplace",
    tagline:
      "A hybrid-payment NFT marketplace using lazy minting and off-chain signatures to bridge fiat gateways with on-chain execution.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: true,
    index: "03",
    chains: ["Ethereum"],
    stack: ["Solidity", "Lazy Minting", "EIP-712", "EIP-2981"],
    metrics: [
      { value: "0", label: "Upfront gas for creators" },
      { value: "Fiat", label: "Payment path supported" },
      { value: "EIP-2981", label: "Portable royalty standard" },
    ],
    problem: [
      "Two frictions keep mainstream users off NFT marketplaces. Creators must pay gas to mint work that may never sell, and buyers must already hold crypto to buy anything at all. Either one alone suppresses a marketplace; together they confine it to people who are already inside the ecosystem.",
      "The goal was a marketplace where listing costs a creator nothing and a buyer can pay with a card, without surrendering on-chain settlement or verifiable provenance.",
    ],
    architecture: [
      {
        title: "Lazy minting",
        body: "Listing produces a signed voucher, not a token. The NFT is minted during the first purchase, in the same transaction that transfers it to the buyer — so an unsold listing never touches the chain and never costs anyone gas. Creators can list a full catalogue for free and only pay when value actually moves.",
      },
      {
        title: "Off-chain signature verification",
        body: "Each voucher is an EIP-712 typed-data structure signed by the creator, committing to token metadata, price and terms. The contract recovers the signer on redemption and will only mint if the recovered address matches the claimed creator, making the signature itself the authorization.",
      },
      {
        title: "Fiat ↔ on-chain bridge",
        body: "When a buyer pays through the fiat gateway, settlement confirmation triggers voucher redemption on-chain. The payment rail and the minting rail stay separate systems joined by the signature, so the contract never needs to know or trust anything about payment processing.",
      },
      {
        title: "Royalties",
        body: "EIP-2981 exposes royalty terms as a standard on-chain query, so secondary sales on any compliant marketplace can read and honour the creator's terms without a bespoke integration.",
      },
    ],
    decisions: [
      {
        title: "Mint on purchase, not on listing",
        body: "The conventional flow writes to the chain at the moment of least certainty — when nobody has agreed to buy. Deferring the mint to the point of sale aligns cost with value and removes the creator's financial risk in listing, which is what actually determines whether a catalogue gets listed at all.",
      },
      {
        title: "EIP-712 rather than an ad-hoc signature scheme",
        body: "EIP-712 binds the signature to a domain — contract address and chain id — and renders the signed content as readable fields in the wallet. A hand-rolled scheme would need to solve replay protection and cross-contract reuse from scratch, and would still leave the creator signing something opaque.",
      },
      {
        title: "EIP-2981 over a marketplace-private royalty table",
        body: "A private table only governs sales on the marketplace that owns it. Publishing royalty terms through the standard interface means they travel with the token, so the creator's terms survive a sale anywhere that reads the standard.",
      },
    ],
    security: [
      "Signer recovery enforced on every redemption — an invalid or mismatched signature cannot mint",
      "Voucher replay protection scoped to token identity",
      "EIP-712 domain separation binds vouchers to the contract and chain",
      "Fiat settlement confirmed before on-chain redemption is permitted",
    ],
  },
  {
    slug: "ecoyield-energy",
    title: "EcoYield Energy",
    subtitle: "RWA Token & ICO Platform",
    tagline:
      "An upgradeable RWA token with a 10-phase ICO, Chainlink-priced multi-currency payments, 8 vesting schedules and DAO governance.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: true,
    index: "04",
    chains: ["Ethereum"],
    stack: [
      "Solidity",
      "Hardhat",
      "OpenZeppelin UUPS",
      "Chainlink Oracles",
      "Merkle Trees",
      "Snapshot DAO",
      "ReentrancyGuard",
    ],
    metrics: [
      { value: "10", label: "ICO phases" },
      { value: "8", label: "Role-based vesting schedules" },
      { value: "3", label: "Accepted currencies" },
    ],
    problem: [
      "Tokenizing a real-world renewable energy asset brings constraints that a plain token sale does not have. The raise runs in phases with different pricing, participants must be screened before they can buy, different stakeholder classes unlock on different timetables, and holders need a say in how the asset is run.",
      "Each of those is a contract-design problem with a cheap wrong answer and an expensive right one.",
    ],
    architecture: [
      {
        title: "Upgradeable ERC-20 core",
        body: "The token deploys behind an OpenZeppelin UUPS proxy. An RWA token is expected to outlive several regulatory interpretations, and upgradeability is what makes compliance adjustments possible without migrating every holder to a new contract.",
      },
      {
        title: "10-phase ICO with oracle pricing",
        body: "The sale advances through ten configurable phases, each with its own rate and allocation. Payment is accepted in ETH, USDC and USDT, with Chainlink price feeds converting each to a common denomination at execution time so pricing stays consistent regardless of which asset a buyer brings.",
      },
      {
        title: "Merkle whitelisting",
        body: "Eligibility is committed as a single Merkle root on-chain. Participants supply a proof when they buy, which the contract verifies against the root. Adding ten thousand approved addresses costs exactly as much storage as adding one.",
      },
      {
        title: "Vesting & staking",
        body: "Eight role-based vesting schedules handle distinct stakeholder classes — team, advisors, private and public participants and others — each with its own cliff and release curve. A separate staking contract applies time-locked multipliers, so longer commitments earn proportionally more.",
      },
      {
        title: "Governance via Snapshot",
        body: "Voting runs off-chain through Snapshot against on-chain token balances. Holders vote by signing a message rather than sending a transaction, which removes gas cost as a barrier to participation.",
      },
    ],
    decisions: [
      {
        title: "Merkle proofs instead of an on-chain allowlist mapping",
        body: "A mapping costs a storage write per address — for a whitelist of any real size, that is a large, growing and entirely avoidable expense. A Merkle root is one slot regardless of set size, shifting the cost to proof verification at purchase time, which the buyer pays and which stays constant.",
      },
      {
        title: "Chainlink feeds rather than an admin-set price",
        body: "Manually posted prices are both an operational burden and a trust assumption — holders have to believe the operator is updating honestly and promptly. Chainlink's aggregated feeds remove the operator from the pricing path entirely, which matters most during the volatility where a stale price would do real damage.",
      },
      {
        title: "Off-chain voting via Snapshot",
        body: "On-chain governance makes every vote a paid transaction, which systematically suppresses turnout among smaller holders and skews outcomes toward whales. Snapshot reads the same on-chain balances but settles the vote off-chain, so participation costs nothing and the recorded preference reflects the holder base rather than who could afford to vote.",
      },
      {
        title: "Separate staking contract",
        body: "Keeping staking out of the token contract limits what an upgrade to either one can affect. The token can evolve for compliance reasons without disturbing active stake positions, and staking logic can be revised without touching the asset itself.",
      },
    ],
    security: [
      "ReentrancyGuard across purchase, claim and staking withdrawal paths",
      "Merkle proof verification required for every whitelisted purchase",
      "Chainlink feed consumption with validity checks before pricing a sale",
      "Role-based access control separating phase administration from treasury movement",
      "UUPS upgrade authority held behind an explicit admin role",
    ],
  },
  {
    slug: "lydiacoin",
    title: "LydiaCoin",
    subtitle: "Dual-Token Treasury System",
    tagline:
      "Four upgradeable contracts — a utility token, a stablecoin with two-phase burn approval, an M-of-N multi-sig treasury and a distribution hub.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: true,
    index: "05",
    chains: ["Ethereum Sepolia"],
    stack: [
      "Solidity",
      "Hardhat",
      "OpenZeppelin UUPS",
      "Multi-Sig Governance",
      "AccessControl",
      "ReentrancyGuard",
    ],
    metrics: [
      { value: "4", label: "Upgradeable contracts" },
      { value: "M-of-N", label: "Configurable approval threshold" },
      { value: "2-phase", label: "Burn approval flow" },
    ],
    problem: [
      "A two-token system where one token is a stablecoin raises a question most token projects can defer: who is allowed to destroy supply, and what stops a single compromised key from doing it? The same question applies to the treasury holding both assets.",
      "The system needed governance strong enough that no individual actor can unilaterally move funds or alter supply, without becoming so rigid that routine operations stall.",
    ],
    architecture: [
      {
        title: "BSW — utility token",
        body: "An upgradeable ERC-20 serving as the ecosystem's utility asset, with role-based access control governing minting and administrative functions.",
      },
      {
        title: "LYD — stablecoin with two-phase burn",
        body: "Burning supply is split into propose and approve steps carried out by different authorized parties. A single key — even a fully compromised one — can propose a burn but cannot execute it, so supply destruction always requires a second, independent approval.",
      },
      {
        title: "M-of-N multi-signature treasury",
        body: "The treasury vault requires M approvals from N designated signers before any movement of funds, with the threshold configurable as the signer set changes. No single signer, and no minority of signers, can move the treasury.",
      },
      {
        title: "Dual-token distribution hub",
        body: "A single contract coordinates distribution of both tokens, keeping allocation logic in one auditable place rather than duplicated across two token contracts that could drift apart over time.",
      },
    ],
    decisions: [
      {
        title: "Two-phase burn rather than a single burn role",
        body: "Supply destruction is irreversible and, for a stablecoin, directly affects the peg. A one-step burn makes the holder of that role a single point of catastrophic failure. Splitting proposal from approval means an attacker needs two independent compromises, and gives a legitimate operator a window to notice and reject an illegitimate proposal.",
      },
      {
        title: "Configurable M-of-N instead of a fixed threshold",
        body: "A hardcoded threshold ages badly — signers leave, the organization grows, risk tolerance changes. Making M and N adjustable through governance means the security model can track the organization rather than being frozen at deployment and silently becoming either an obstacle or a liability.",
      },
      {
        title: "Blacklist management at the token layer",
        body: "A stablecoin operating under any compliance regime needs the ability to freeze addresses on legal instruction. Implementing it in the token contract means the control applies to every transfer path rather than only to those that happen to route through the project's own interfaces.",
      },
      {
        title: "Four contracts rather than one",
        body: "Separating token, stablecoin, treasury and distribution keeps each upgrade surface small and independently reviewable. A fault or upgrade in distribution logic cannot reach treasury custody, and the blast radius of any single mistake stays bounded.",
      },
    ],
    security: [
      "Two-phase burn approval — proposal and execution require separate authorized parties",
      "M-of-N multi-signature required for all treasury movement",
      "Role-based access control across all four contracts",
      "Blacklist management enforced at the transfer layer",
      "ReentrancyGuard on distribution and treasury withdrawal paths",
    ],
  },
  {
    slug: "guild",
    title: "Guild",
    subtitle: "Musical NFT Marketplace",
    tagline:
      "A dual-ecosystem NFT platform for 19,999 assets with signature-based dynamic pricing and transferable royalty management rights.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: true,
    index: "06",
    chains: ["Base Sepolia"],
    stack: ["Solidity", "Hardhat", "OpenZeppelin UUPS", "ECDSA", "EIP-191"],
    metrics: [
      { value: "19,999", label: "Assets supported" },
      { value: "2", label: "Linked ecosystems" },
      { value: "Multi", label: "Recipient royalty splits" },
    ],
    problem: [
      "Music rights are owned in fractions by multiple parties, and those fractions change hands independently of the recording itself. A standard single-recipient royalty cannot express that, and a pricing model fixed at deployment cannot respond to demand across a 19,999-asset collection.",
      "Both problems have obvious on-chain solutions that are far too expensive to actually use at that scale.",
    ],
    architecture: [
      {
        title: "Dual-ecosystem structure",
        body: "Two linked asset ecosystems operate under a shared contract architecture, supporting 19,999 assets with distinct behaviour per ecosystem while sharing pricing, verification and royalty infrastructure.",
      },
      {
        title: "Signature-based dynamic pricing",
        body: "Prices are computed off-chain and delivered as EIP-191 signed messages. The contract recovers the signer with ECDSA and accepts the price only if it came from the authorized pricing key — so pricing can respond to demand continuously while the chain only ever performs a signature verification.",
      },
      {
        title: "Multi-recipient royalties",
        body: "Royalties distribute across multiple parties according to configured splits, reflecting how music rights are genuinely held rather than collapsing them into one payee address.",
      },
      {
        title: "Transferable management rights",
        body: "The right to manage a royalty configuration is itself transferable, separately from the asset. A rights holder can hand administration to a label or manager without transferring ownership of the underlying NFT.",
      },
    ],
    decisions: [
      {
        title: "Off-chain pricing with on-chain verification",
        body: "Storing a price per asset would mean 19,999 storage writes to deploy and another write every time any price changed. Signature verification costs a fixed, small amount regardless of collection size and regardless of how often prices move — the computation lives off-chain, and only the authorization is proven on-chain.",
      },
      {
        title: "EIP-191 rather than EIP-712",
        body: "EIP-712 earns its extra complexity when a user is signing something they need to read and understand. Here the signer is the platform's own pricing service and the payload is a short machine-generated quote — EIP-191's simpler personal-message format is sufficient, and keeps the verification path minimal.",
      },
      {
        title: "Royalty management as a transferable right",
        body: "Music rights administration changes hands constantly — artists switch labels, catalogues get acquired, managers come and go. Binding administration permanently to NFT ownership would force an asset transfer for every administrative change. Separating the two lets each move on its own terms.",
      },
    ],
    security: [
      "ECDSA signer recovery enforced on every priced transaction",
      "Authorized pricing key validated against on-chain configuration",
      "UUPS upgrade authority restricted to an administrative role",
      "Royalty management transfers gated behind current-holder authorization",
    ],
    optimization: [
      "Pricing moved off-chain entirely — on-chain cost reduced to a single ECDSA recovery",
      "Avoided 19,999 per-asset price storage slots",
      "Shared infrastructure across both ecosystems rather than duplicated contracts",
    ],
  },
  {
    slug: "landhacker",
    title: "landhacker",
    subtitle: "Microservice Platform",
    tagline:
      "A 12-service Node.js microservice system with event-driven messaging, a rate-limited API gateway and Kubernetes deployment.",
    org: "SoluLab",
    period: "2024 — Present",
    featured: false,
    index: "07",
    chains: [],
    stack: ["Node.js", "Microservices", "RabbitMQ", "Docker", "Kubernetes", "API Gateway"],
    metrics: [
      { value: "12", label: "Independent services" },
      { value: "Event", label: "Driven communication" },
      { value: "K8s", label: "Production orchestration" },
    ],
    problem: [
      "A platform with twelve distinct service domains cannot be built as a monolith without every deploy becoming a coordination problem across the whole system. But naive microservices trade that for a different failure: synchronous call chains where any one service being slow or down takes the rest with it.",
    ],
    architecture: [
      {
        title: "Twelve-service decomposition",
        body: "The system is split into twelve independently deployable Node.js services, each owning its domain and data, so teams can ship on separate cadences without coordinating releases.",
      },
      {
        title: "Event-driven messaging",
        body: "Services communicate through RabbitMQ rather than direct synchronous calls. A publisher emits an event and moves on; consumers process when able. A slow or temporarily unavailable service queues work instead of propagating failure back through the caller.",
      },
      {
        title: "API gateway",
        body: "A single gateway fronts the system, handling authentication and rate limiting centrally. Clients get one endpoint and one auth model, and individual services do not each reimplement request validation.",
      },
      {
        title: "Container orchestration",
        body: "Services are containerized with Docker and deployed on Kubernetes, giving per-service horizontal scaling, health-checked rollouts and automatic restart.",
      },
    ],
    decisions: [
      {
        title: "Message broker over direct service calls",
        body: "Synchronous inter-service HTTP couples availability — every call is a chance to inherit someone else's outage, and in a twelve-service system those chances compound fast. RabbitMQ decouples producers from consumers, so a service going down delays work rather than failing it.",
      },
      {
        title: "Centralized auth and rate limiting at the gateway",
        body: "Implementing these per service means twelve implementations that will drift, and twelve places for a gap to open. Enforcing at the gateway gives one place to reason about and one place to change when policy does.",
      },
    ],
    security: [
      "Authentication enforced centrally at the API gateway",
      "Rate limiting applied at the edge before requests reach services",
      "Service isolation — no direct cross-service database access",
    ],
  },
  {
    slug: "webwallet",
    title: "WebWallet",
    subtitle: "Multi-Chain Wallet",
    tagline:
      "A multi-chain cryptocurrency wallet supporting 12 testnets across 8 EVM and 4 non-EVM networks, built from primitives.",
    org: "Personal",
    period: "Personal project",
    featured: true,
    index: "08",
    chains: ["12 Testnets", "8 EVM", "4 Non-EVM"],
    stack: ["Solidity", "Hardhat", "OpenZeppelin", "Node.js", "Express", "Vanilla JavaScript"],
    metrics: [
      { value: "12", label: "Blockchain testnets" },
      { value: "8", label: "EVM networks" },
      { value: "4", label: "Non-EVM networks" },
    ],
    problem: [
      "Wallet SDKs hide exactly the parts worth understanding — key derivation, transaction construction, how signing actually differs between an EVM chain and a non-EVM one. This project was built to work at that level directly, without a wallet library standing in between.",
    ],
    architecture: [
      {
        title: "Twelve-network support",
        body: "Eight EVM networks and four non-EVM networks behind one interface. The EVM chains share a signing and transaction-construction path; the non-EVM networks each required their own, which is precisely where the differences between ecosystems stop being abstract.",
      },
      {
        title: "Key management",
        body: "Generates new wallets for any supported network and imports existing ones from private keys, with derivation handled per network's own scheme.",
      },
      {
        title: "Transfers",
        body: "Sends both native currency and tokens, with transaction construction, fee estimation and broadcast implemented per network family rather than delegated to a wallet SDK.",
      },
      {
        title: "QR address sharing",
        body: "Generates QR codes for receiving addresses — a small feature that removes the most common way people lose funds, which is transcribing an address by hand.",
      },
    ],
    decisions: [
      {
        title: "Vanilla JavaScript, no framework",
        body: "The interesting problems here are cryptographic and protocol-level, not architectural. A framework would have added build complexity and abstraction without touching the part of the problem actually worth solving.",
      },
      {
        title: "Testnets only, deliberately",
        body: "The objective was to understand multi-chain transaction construction across twelve networks, which testnets support identically. Keeping real funds out of the project meant free, unlimited experimentation at the exact layer the project exists to explore.",
      },
      {
        title: "Covering non-EVM networks too",
        body: "Eight EVM chains would have been eight variations on the same signing path. Adding four non-EVM networks forced the design to accommodate genuinely different account models, address formats and transaction structures — which is where the real learning was.",
      },
    ],
    security: [
      "Private keys handled client-side and never transmitted",
      "Testnet-only scope by design — no mainnet key exposure",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Chakri1407" }],
  },
  {
    slug: "solana-dex",
    title: "Solana DEX",
    subtitle: "AMM Ported from EVM",
    tagline:
      "Ported Uniswap V2's constant-product AMM from Solidity to Solana, with Router and Factory programs using CPI for atomic swaps.",
    org: "Personal",
    period: "Pre-sales project",
    featured: true,
    index: "09",
    chains: ["Solana"],
    stack: ["Rust", "Anchor", "Solana", "CPI", "AMM"],
    metrics: [
      { value: "x·y=k", label: "Constant product invariant" },
      { value: "2", label: "Programs — Router & Factory" },
      { value: "CPI", label: "Atomic cross-program swaps" },
    ],
    problem: [
      "Uniswap V2's maths is simple enough to state in one line. Its implementation, however, assumes a specific execution model — contracts that own their storage, hold balances and call each other freely. Solana provides none of those assumptions.",
      "Porting the AMM meant separating what is genuinely the algorithm from what was only ever an artifact of how the EVM works.",
    ],
    architecture: [
      {
        title: "Constant-product core",
        body: "The x·y=k invariant and its swap, mint and burn mechanics reimplemented in Rust with Anchor, preserving Uniswap V2's pricing behaviour while fitting Solana's account model.",
      },
      {
        title: "Factory program",
        body: "Deploys and tracks pools as program-derived addresses. Where the EVM version deploys a new contract per pair, the Solana version derives deterministic accounts — same guarantee of one canonical pool per pair, reached by a completely different mechanism.",
      },
      {
        title: "Router program",
        body: "Handles multi-hop routing and calls into pool programs via CPI, so a swap crossing several pools either completes entirely or reverts entirely — the atomicity guarantee the EVM version gets from being one transaction on one chain.",
      },
      {
        title: "Account model translation",
        body: "EVM contracts carry their own storage; Solana programs are stateless and operate on accounts passed in by the caller. Every piece of pool state had to be re-expressed as explicit accounts with ownership and mutability declared up front — the single largest structural difference between the two implementations.",
      },
    ],
    decisions: [
      {
        title: "PDAs instead of deploying a contract per pair",
        body: "Uniswap deploys a fresh pair contract for every market. Solana's equivalent is a program-derived address — deterministic, derivable by anyone from the token pair, and requiring no deployment at all. Same uniqueness property, none of the per-pair deployment cost.",
      },
      {
        title: "CPI for multi-hop atomicity",
        body: "A routed swap passing through two pools must not be able to half-complete. Cross-program invocation keeps the whole path inside one transaction, so partial execution is not a state the system can reach.",
      },
      {
        title: "Anchor over raw Solana programs",
        body: "Anchor handles account validation, serialization and the boilerplate around instruction dispatch. On a port where the real difficulty is the model mismatch, eliminating a known class of account-validation mistakes was worth the framework dependency.",
      },
    ],
    security: [
      "Anchor account constraints enforce ownership and mutability at the instruction boundary",
      "Constant-product invariant checked after every swap",
      "Atomic execution across multi-hop routes via CPI",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Chakri1407" }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
