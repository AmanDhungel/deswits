/**
 * Sample portfolio data for the dashboard UI template. Swap for a real
 * `investments` collection + API route once deal data exists — the
 * dashboard page flags this clearly as sample data.
 */
export const OVERVIEW_STATS = [
  { label: "Portfolio value", value: "$5,150", change: "+18.4% all-time", positive: true },
  { label: "Active investments", value: "3", change: "Across 3 sectors", positive: true },
  { label: "Startups backed", value: "3", change: "1 new this quarter", positive: true },
  { label: "Avg. ROI", value: "+16.9%", change: "vs. blended benchmark", positive: true },
] as const;

export interface HoldingRow {
  name: string;
  sector: string;
  stage: string;
  invested: string;
  value: string;
  change: string;
  positive: boolean;
  progress: number;
}

export const SAMPLE_HOLDINGS: HoldingRow[] = [
  {
    name: "NovaChain Labs",
    sector: "DeFi Infrastructure",
    stage: "Series A",
    invested: "$2,500",
    value: "$3,120",
    change: "+24.8%",
    positive: true,
    progress: 68,
  },
  {
    name: "LumenGrid",
    sector: "Clean Energy",
    stage: "Seed",
    invested: "$1,000",
    value: "$1,340",
    change: "+34.0%",
    positive: true,
    progress: 45,
  },
  {
    name: "Sanjal Robotics",
    sector: "Automation",
    stage: "Pre-Seed",
    invested: "$750",
    value: "$690",
    change: "-8.0%",
    positive: false,
    progress: 22,
  },
];
