export interface Holding {
  ticker: string;
  name: string;
  pct: number;
  type: 'equity' | 'fixed-income' | 'alternative' | 'cash';
}

export interface Client {
  id: string;
  name: string;
  aum: number;
  rateRisk: number;
  creditRisk: number;
  concentrationRisk: number;
  rateRiskDelta: number;
  creditRiskDelta: number;
  concentrationRiskDelta: number;
  topHoldings: Holding[];
  lastReviewed: string;
  riskNarrative: string;
}

export type RiskFactor = 'rate' | 'credit' | 'concentration';
export type SortField = 'name' | 'aum' | 'score';
export type SortDir = 'asc' | 'desc';
