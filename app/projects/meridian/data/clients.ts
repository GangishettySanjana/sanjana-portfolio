import type { Client, Holding } from '../types';

function sr(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const FIRST = [
  'James', 'Patricia', 'Robert', 'Jennifer', 'Michael',
  'Linda', 'William', 'Barbara', 'David', 'Elizabeth',
  'Richard', 'Susan', 'Joseph', 'Mary', 'Thomas',
  'Karen', 'Charles', 'Sarah', 'Christopher', 'Lisa',
];

const LAST = [
  'Morrison', 'Chen', 'Okafor', 'Patel', 'Reinholt',
  'Walsh', 'Tanaka', 'Robertson', 'Garza', 'Whitfield',
  'Nakamura', "O'Brien", 'Johansson', 'Abramowitz', 'Kowalski',
  'Santos', 'Mueller', 'Diallo', 'Rosenberg', 'Fischer',
  'Nguyen', 'Kim', 'Park', 'Singh', 'Williams',
  'Ahmed', 'Ferreira', 'Petrov', 'Andersen', 'Yamamoto',
];

type Inst = { ticker: string; name: string; type: Holding['type'] };

const INSTRUMENTS: Inst[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', type: 'equity' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', type: 'equity' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', type: 'equity' },
  { ticker: 'AMZN', name: 'Amazon.com', type: 'equity' },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway', type: 'equity' },
  { ticker: 'JPM', name: 'JPMorgan Chase', type: 'equity' },
  { ticker: 'V', name: 'Visa Inc.', type: 'equity' },
  { ticker: 'XOM', name: 'Exxon Mobil', type: 'equity' },
  { ticker: 'PG', name: 'Procter & Gamble', type: 'equity' },
  { ticker: 'MA', name: 'Mastercard Inc.', type: 'equity' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', type: 'equity' },
  { ticker: 'BAC', name: 'Bank of America', type: 'equity' },
  { ticker: 'US-10Y', name: 'US Treasury 10Y', type: 'fixed-income' },
  { ticker: 'US-30Y', name: 'US Treasury 30Y', type: 'fixed-income' },
  { ticker: 'CORP-IG', name: 'Inv. Grade Corp.', type: 'fixed-income' },
  { ticker: 'CORP-HY', name: 'High Yield Corp.', type: 'fixed-income' },
  { ticker: 'MBS', name: 'Mortgage-Backed', type: 'fixed-income' },
  { ticker: 'MUNI', name: 'Municipal Bonds', type: 'fixed-income' },
  { ticker: 'TIPS', name: 'Inflation-Linked', type: 'fixed-income' },
  { ticker: 'EM-DEBT', name: 'EM Sovereign Debt', type: 'fixed-income' },
  { ticker: 'REIT', name: 'Real Estate ETF', type: 'alternative' },
  { ticker: 'GOLD', name: 'Gold ETF', type: 'alternative' },
  { ticker: 'PE-FUND', name: 'Private Equity', type: 'alternative' },
  { ticker: 'HEDGE-A', name: 'Hedge Fund A', type: 'alternative' },
  { ticker: 'CASH', name: 'Cash & Equivalents', type: 'cash' },
];

function pickHoldings(i: number): Holding[] {
  const count = 5 + Math.floor(sr(i * 13) * 3);
  const pool = [...INSTRUMENTS];
  for (let k = pool.length - 1; k > 0; k--) {
    const j = Math.floor(sr(i * 17 + k) * (k + 1));
    [pool[k], pool[j]] = [pool[j], pool[k]];
  }
  const selected = pool.slice(0, count);
  const weights = selected.map((_, j) => 0.4 + sr(i * 31 + j) * 1.6);
  const total = weights.reduce((a, b) => a + b, 0);
  return selected
    .map((inst, j) => ({ ticker: inst.ticker, name: inst.name, type: inst.type, pct: weights[j] / total }))
    .sort((a, b) => b.pct - a.pct);
}

function buildNarrative(
  rateRisk: number,
  creditRisk: number,
  concentrationRisk: number,
  holdings: Holding[]
): string {
  const maxScore = Math.max(rateRisk, creditRisk, concentrationRisk);
  const topHolding = holdings[0];
  const fiPct = holdings.filter(h => h.type === 'fixed-income').reduce((s, h) => s + h.pct, 0);

  if (rateRisk === maxScore && rateRisk > 0.65) {
    return `Duration exposure is elevated. Fixed income represents ${(fiPct * 100).toFixed(0)}% of the portfolio — a 100bps rate rise would impact NAV by approximately ${(rateRisk * 8.5).toFixed(1)}%. Consider shortening duration or adding TIPS as a hedge.`;
  }
  if (creditRisk === maxScore && creditRisk > 0.65) {
    return `High-yield allocation exceeds the policy threshold. Spread widening of 200bps would reduce portfolio value by approximately ${(creditRisk * 6.2).toFixed(1)}%. Review CORP-HY position sizing against risk budget.`;
  }
  if (concentrationRisk === maxScore && concentrationRisk > 0.65) {
    return `${topHolding.name} represents ${(topHolding.pct * 100).toFixed(1)}% of the portfolio, above the 15% single-name limit. Flag for rebalancing — consider trimming or adding a covered position to reduce idiosyncratic risk.`;
  }
  if (maxScore > 0.5) {
    const name = rateRisk > creditRisk && rateRisk > concentrationRisk ? 'Rate' : creditRisk > concentrationRisk ? 'Credit' : 'Concentration';
    return `${name} risk is elevated but within policy threshold. Trend is upward over the past 30 days — monitor before next scheduled review.`;
  }
  return 'All three risk factors are within policy bounds. Portfolio is well-diversified. No immediate action required.';
}

function isoDate(daysBack: number): string {
  const d = new Date('2026-08-20');
  d.setDate(d.getDate() - daysBack);
  return d.toISOString().split('T')[0];
}

export const clients: Client[] = Array.from({ length: 200 }, (_, i) => {
  const s = i + 1;

  const firstName = FIRST[i % FIRST.length];
  const lastName = LAST[Math.floor(i / FIRST.length) % LAST.length];
  const name = `${firstName} ${lastName}`;

  const aum = Math.round((1.2 + sr(s * 3) * 46.6) * 10) / 10;

  const rateOverExp = i % 10 < 3;
  const rateRisk = Math.round((rateOverExp ? 0.66 + sr(s * 5) * 0.30 : sr(s * 5) * 0.62) * 100) / 100;

  const creditOverExp = i % 5 === 0 && !rateOverExp;
  const creditRisk = Math.round((creditOverExp ? 0.66 + sr(s * 7) * 0.28 : sr(s * 7) * 0.62) * 100) / 100;

  const concOverExp = i % 4 === 0 && !rateOverExp && !creditOverExp;
  const concentrationRisk = Math.round((concOverExp ? 0.66 + sr(s * 11) * 0.27 : sr(s * 11) * 0.62) * 100) / 100;

  const rateRiskDelta = Math.round((sr(s * 23) - 0.5) * 0.18 * 100) / 100;
  const creditRiskDelta = Math.round((sr(s * 29) - 0.5) * 0.16 * 100) / 100;
  const concentrationRiskDelta = Math.round((sr(s * 37) - 0.5) * 0.14 * 100) / 100;

  const topHoldings = pickHoldings(s);
  const riskNarrative = buildNarrative(rateRisk, creditRisk, concentrationRisk, topHoldings);
  const lastReviewed = isoDate(Math.floor(sr(s * 7) * 90));

  return {
    id: `CLT-${String(i + 1).padStart(3, '0')}`,
    name,
    aum,
    rateRisk,
    creditRisk,
    concentrationRisk,
    rateRiskDelta,
    creditRiskDelta,
    concentrationRiskDelta,
    topHoldings,
    lastReviewed,
    riskNarrative,
  };
});
