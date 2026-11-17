import React, { useMemo, useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { StudentProfile } from '../types/curriculum';
import { getChartStarHistory } from '../utils/storage';
import { Star, TrendingUp } from 'lucide-react';

interface StarProgressChartProps {
  student: StudentProfile | null;
}

interface ChartDatum {
  date: string;
  label: string;
  starsEarned: number;
  totalStars: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartDatum }[];
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2.5 shadow-lg border border-slate-700 text-xs space-y-1">
      <p className="font-bold text-slate-200">{data.label} ({data.date})</p>
      <p className="tabular-nums text-amber-300 font-bold">
        Günlük Kazanılan: +{data.starsEarned} ★
      </p>
      <p className="tabular-nums text-purple-200 font-bold">
        Toplam Biriken: {data.totalStars} ★
      </p>
    </div>
  );
};

export const StarProgressChart: React.FC<StarProgressChartProps> = ({ student }) => {
  const [rangeDays, setRangeDays] = useState<7 | 14>(7);

  const chartData = useMemo(
    () => getChartStarHistory(student, rangeDays),
    [student, rangeDays]
  );

  const todayEarned = chartData[chartData.length - 1]?.starsEarned ?? 0;
  const activeDaysCount = useMemo(
    () => (student?.starHistory?.filter((d) => d.starsEarned > 0).length ?? 0),
    [student]
  );

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#5B21B6]" />
            <h3 className="text-lg font-extrabold text-slate-900">
              Günlük Yıldız Gelişim Grafiği
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            {student
              ? `Bugün kazanılan: +${todayEarned} ★ · Çalışılan gün sayısı: ${activeDaysCount} gün`
              : 'Öğrenci adını yazıp çalışmaya başladığında günlük yıldız birikimin burada grafik olarak görünür.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setRangeDays(7)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              rangeDays === 7
                ? 'bg-[#4C1D95] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Son 7 Gün
          </button>
          <button
            type="button"
            onClick={() => setRangeDays(14)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              rangeDays === 14
                ? 'bg-[#4C1D95] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Son 14 Gün
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#C2410C] inline-block" />
          Günlük Kazanılan Yıldız
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#5B21B6] inline-block" />
          Toplam Biriken Yıldız
        </span>
      </div>

      {student ? (
        <div className="w-full h-64 bg-white border border-slate-200 rounded-xl p-3 sm:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 14, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="totalStarsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Area
                type="monotone"
                dataKey="totalStars"
                name="Toplam Yıldız"
                stroke="#5B21B6"
                strokeWidth={2.5}
                fill="url(#totalStarsFill)"
                dot={{ r: 3.5, fill: '#5B21B6', strokeWidth: 0 }}
                activeDot={{ r: 5.5, fill: '#4C1D95' }}
              />
              <Bar
                dataKey="starsEarned"
                name="Günlük Yıldız"
                fill="#C2410C"
                radius={[6, 6, 0, 0]}
                barSize={22}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-52 bg-white border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-center p-6">
          <Star className="w-8 h-8 text-amber-400 fill-amber-300" />
          <p className="text-sm font-bold text-slate-700">
            Henüz aktif öğrenci seçilmedi
          </p>
          <p className="text-xs text-slate-500 max-w-md">
            Yukarıdaki alana adını yazıp çalışmaya başladığında her gün topladığın yıldızlar burada grafikle takip edilir.
          </p>
        </div>
      )}
    </div>
  );
};
