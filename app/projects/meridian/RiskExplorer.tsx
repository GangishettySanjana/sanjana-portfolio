'use client'
import { useState, useMemo, useCallback } from 'react';
import { clients } from './data/clients';
import type { Client, RiskFactor, SortField, SortDir } from './types';
import ClientDrilldown from './ClientDrilldown';

const THRESHOLD = 0.65;

const FACTOR_LABELS: Record<RiskFactor, string> = {
  rate: 'Rate Risk',
  credit: 'Credit Risk',
  concentration: 'Concentration',
};

function StatusDot({ score }: { score: number }) {
  if (score > THRESHOLD) return <span className="inline-block w-2 h-2 rounded-full bg-red-500 shrink-0" />;
  if (score > 0.5) return <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shrink-0" />;
  return <span className="inline-block w-2 h-2 rounded-full bg-green-400 shrink-0" />;
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-gray-300">↕</span>;
  return <span className="ml-1 text-gray-600">{dir === 'desc' ? '↓' : '↑'}</span>;
}

interface ClientRowProps {
  client: Client;
  score: number;
  delta: number;
  isSelected: boolean;
  onSelect: () => void;
}

function ClientRow({ client, score, delta, isSelected, onSelect }: ClientRowProps) {
  const over = score > THRESHOLD;
  const elevated = score > 0.5 && !over;
  const scoreColor = over ? 'text-red-600' : elevated ? 'text-amber-600' : 'text-green-600';
  const barColor = over ? 'bg-red-400' : elevated ? 'bg-amber-400' : 'bg-green-400';

  return (
    <tr
      className={`cursor-pointer border-b border-gray-100 transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      } ${over ? 'border-l-2 border-l-red-400' : elevated ? 'border-l-2 border-l-amber-300' : 'border-l-2 border-l-transparent'}`}
      onClick={onSelect}
    >
      <td className="py-2.5 pl-3 pr-2 w-6">
        <StatusDot score={score} />
      </td>
      <td className="py-2.5 pr-4">
        <div className="font-medium text-gray-900 text-sm leading-tight">{client.name}</div>
        <div className="text-xs text-gray-400 font-mono mt-0.5">{client.id}</div>
      </td>
      <td className="py-2.5 pr-4 text-right">
        <span className="text-sm font-mono text-gray-700">{client.aum.toFixed(1)}</span>
      </td>
      <td className="py-2.5 pr-4 w-28">
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-mono font-semibold ${scoreColor} w-8 text-right`}>
            {(score * 100).toFixed(0)}
          </span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full relative min-w-[40px]">
            <div
              className={`h-1.5 rounded-full ${barColor}`}
              style={{ width: `${Math.min(score * 100, 100)}%` }}
            />
            <div className="absolute top-0 h-1.5 w-px bg-gray-300" style={{ left: `${THRESHOLD * 100}%` }} />
          </div>
        </div>
      </td>
      <td className="py-2.5 pr-4 w-16">
        <span className={`text-xs font-mono ${delta > 0 ? 'text-red-500' : delta < 0 ? 'text-green-600' : 'text-gray-400'}`}>
          {delta > 0 ? '↑' : delta < 0 ? '↓' : '—'}{delta !== 0 ? Math.abs(Math.round(delta * 100)) : ''}
        </span>
      </td>
      <td className="py-2.5 pr-5 text-xs text-gray-400 font-mono whitespace-nowrap">{client.lastReviewed}</td>
    </tr>
  );
}

export default function RiskExplorer() {
  const [factor, setFactor] = useState<RiskFactor>('rate');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterMode, setFilterMode] = useState<'all' | 'overexposed'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Client | null>(null);

  const getScore = useCallback((c: Client) => {
    if (factor === 'rate') return c.rateRisk;
    if (factor === 'credit') return c.creditRisk;
    return c.concentrationRisk;
  }, [factor]);

  const getDelta = useCallback((c: Client) => {
    if (factor === 'rate') return c.rateRiskDelta;
    if (factor === 'credit') return c.creditRiskDelta;
    return c.concentrationRiskDelta;
  }, [factor]);

  const sortedClients = useMemo(() => {
    let list = [...clients];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }
    if (filterMode === 'overexposed') {
      list = list.filter(c => getScore(c) > THRESHOLD);
    }
    list.sort((a, b) => {
      if (sortField === 'name') {
        return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortField === 'aum') {
        return sortDir === 'asc' ? a.aum - b.aum : b.aum - a.aum;
      }
      return sortDir === 'asc' ? getScore(a) - getScore(b) : getScore(b) - getScore(a);
    });
    return list;
  }, [factor, sortField, sortDir, filterMode, search, getScore]);

  const overCount = useMemo(() => clients.filter(c => getScore(c) > THRESHOLD).length, [getScore]);
  const aumAtRisk = useMemo(() =>
    clients.filter(c => getScore(c) > THRESHOLD).reduce((s, c) => s + c.aum, 0),
    [getScore]
  );
  const avgScore = useMemo(() =>
    clients.reduce((s, c) => s + getScore(c), 0) / clients.length,
    [getScore]
  );

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function handleFactorChange(f: RiskFactor) {
    setFactor(f);
    setSortField('score');
    setSortDir('desc');
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-900">Risk Exposure Console</span>
          <span className="ml-3 text-xs text-gray-400">200 clients · as of 2026-08-20</span>
        </div>
        <div className="text-xs text-gray-400 italic">Fictional data · concept prototype</div>
      </div>

      <div className="border-b border-gray-100 px-5 py-3 flex flex-wrap items-center gap-3">
        <div className="flex rounded border border-gray-200 overflow-hidden text-sm">
          {(['rate', 'credit', 'concentration'] as RiskFactor[]).map(f => (
            <button
              key={f}
              onClick={() => handleFactorChange(f)}
              className={`px-3 py-1.5 font-medium transition-colors ${
                factor === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              } ${f !== 'rate' ? 'border-l border-gray-200' : ''}`}
            >
              {FACTOR_LABELS[f]}
            </button>
          ))}
        </div>

        <div className="flex rounded border border-gray-200 overflow-hidden text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 font-medium transition-colors ${filterMode === 'all' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            All ({clients.length})
          </button>
          <button
            onClick={() => setFilterMode('overexposed')}
            className={`px-3 py-1.5 font-medium border-l border-gray-200 transition-colors ${filterMode === 'overexposed' ? 'bg-red-50 text-red-700' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            Over-exposed ({overCount})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search client…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-700 placeholder:text-gray-300 outline-none focus:border-gray-400 w-40"
        />
      </div>

      <div className="border-b border-gray-100 px-5 py-2.5 flex gap-6 bg-gray-50">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold text-lg text-red-600">{overCount}</span>
          <span className="text-xs text-gray-500">over threshold</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold text-lg text-gray-800">${Math.round(aumAtRisk)}M</span>
          <span className="text-xs text-gray-500">AUM at risk</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold text-lg text-gray-800">{(avgScore * 100).toFixed(0)}</span>
          <span className="text-xs text-gray-500">avg {FACTOR_LABELS[factor].toLowerCase()} score</span>
        </div>
        <div className="ml-auto text-xs text-gray-400 self-center">
          Showing {sortedClients.length} of {clients.length} clients
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: 480 }}>
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2.5 pl-3 pr-2 w-6" />
                  <th className="text-left py-2.5 pr-4">
                    <button onClick={() => handleSort('name')} className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800">
                      Client <SortIcon active={sortField === 'name'} dir={sortDir} />
                    </button>
                  </th>
                  <th className="text-right py-2.5 pr-4">
                    <button onClick={() => handleSort('aum')} className="flex items-center justify-end text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800 ml-auto">
                      AUM ($M) <SortIcon active={sortField === 'aum'} dir={sortDir} />
                    </button>
                  </th>
                  <th className="text-left py-2.5 pr-4 w-28">
                    <button onClick={() => handleSort('score')} className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800">
                      {FACTOR_LABELS[factor]} <SortIcon active={sortField === 'score'} dir={sortDir} />
                    </button>
                  </th>
                  <th className="py-2.5 pr-4 w-16">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">30d</span>
                  </th>
                  <th className="py-2.5 pr-5 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Reviewed</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedClients.map(client => (
                  <ClientRow
                    key={client.id}
                    client={client}
                    score={getScore(client)}
                    delta={getDelta(client)}
                    isSelected={selected?.id === client.id}
                    onSelect={() => setSelected(prev => prev?.id === client.id ? null : client)}
                  />
                ))}
                {sortedClients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                      No clients match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ClientDrilldown
          client={selected}
          activeFactor={factor}
          onClose={() => setSelected(null)}
        />
      </div>
    </div>
  );
}
