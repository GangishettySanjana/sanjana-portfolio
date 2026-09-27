'use client'
import type { Client, Holding, RiskFactor } from './types';

const THRESHOLD = 0.65;

function RiskBar({ label, score, active }: { label: string; score: number; active: boolean }) {
  const over = score > THRESHOLD;
  const elevated = score > 0.5 && !over;
  const color = over ? 'bg-red-500' : elevated ? 'bg-amber-400' : 'bg-green-400';
  const textColor = over ? 'text-red-600' : elevated ? 'text-amber-600' : 'text-green-600';
  const label_ = over ? 'OVER' : elevated ? 'ELEV' : 'OK';

  return (
    <div className={`mb-3 p-2.5 rounded ${active ? 'bg-gray-50 border border-gray-200' : ''}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-xs font-medium ${active ? 'text-gray-800' : 'text-gray-500'}`}>{label}</span>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${over ? 'bg-red-50 text-red-600' : elevated ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
            {label_}
          </span>
          <span className={`font-mono text-sm font-semibold ${textColor}`}>
            {(score * 100).toFixed(0)}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full relative">
        <div className={`h-1.5 rounded-full ${color} transition-all duration-300`} style={{ width: `${score * 100}%` }} />
        <div className="absolute top-0 h-1.5 w-px bg-gray-400" style={{ left: `${THRESHOLD * 100}%` }} />
      </div>
    </div>
  );
}

const TYPE_COLORS: Record<Holding['type'], string> = {
  'equity': 'bg-blue-400',
  'fixed-income': 'bg-violet-400',
  'alternative': 'bg-orange-400',
  'cash': 'bg-gray-300',
};

const TYPE_TEXT: Record<Holding['type'], string> = {
  'equity': 'text-blue-600',
  'fixed-income': 'text-violet-600',
  'alternative': 'text-orange-600',
  'cash': 'text-gray-500',
};

function HoldingBar({ holding }: { holding: Holding }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="text-xs font-mono text-gray-500 w-16 shrink-0 text-right truncate">{holding.ticker}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full">
        <div
          className={`h-2 rounded-full ${TYPE_COLORS[holding.type]} transition-all duration-300`}
          style={{ width: `${Math.min(holding.pct * 100, 100)}%` }}
        />
      </div>
      <span className={`text-xs font-mono w-9 shrink-0 text-right ${TYPE_TEXT[holding.type]}`}>
        {(holding.pct * 100).toFixed(1)}%
      </span>
    </div>
  );
}

interface Props {
  client: Client | null;
  activeFactor: RiskFactor;
  onClose: () => void;
}

export default function ClientDrilldown({ client, activeFactor, onClose }: Props) {
  if (!client) {
    return (
      <div className="w-80 shrink-0 border-l border-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-400 text-center px-8 leading-relaxed">
          Select a client to view risk detail
        </p>
      </div>
    );
  }

  const daysSince = Math.floor(
    (new Date('2026-08-20').getTime() - new Date(client.lastReviewed).getTime()) / 86400000
  );
  const reviewUrgent = daysSince > 45;

  return (
    <div className="w-80 shrink-0 border-l border-gray-200 overflow-y-auto">
      <div className="p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-xs text-gray-400 font-mono mb-0.5">{client.id}</div>
            <div className="font-semibold text-gray-900 text-base leading-tight">{client.name}</div>
            <div className="text-sm text-gray-500 mt-0.5">${client.aum.toFixed(1)}M AUM</div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Risk Exposure</div>
          <p className="text-xs text-gray-400 mb-3">Threshold line at 65. Any score above is flagged.</p>
          <RiskBar label="Interest-Rate Risk" score={client.rateRisk} active={activeFactor === 'rate'} />
          <RiskBar label="Credit Risk" score={client.creditRisk} active={activeFactor === 'credit'} />
          <RiskBar label="Concentration Risk" score={client.concentrationRisk} active={activeFactor === 'concentration'} />
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Top Holdings</div>
          {client.topHoldings.map(h => (
            <HoldingBar key={h.ticker} holding={h} />
          ))}
          <div className="flex gap-3 mt-3 text-xs text-gray-400">
            <span><span className="inline-block w-2 h-2 rounded-sm bg-blue-400 mr-1 align-middle" />Equity</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-violet-400 mr-1 align-middle" />Fixed</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-orange-400 mr-1 align-middle" />Alt</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-gray-300 mr-1 align-middle" />Cash</span>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Risk Analysis</div>
          <p className="text-sm text-gray-700 leading-relaxed">{client.riskNarrative}</p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Last reviewed</span>
            <span className={reviewUrgent ? 'text-amber-600 font-medium' : 'text-gray-600'}>
              {client.lastReviewed} {reviewUrgent ? '· overdue' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
