import { Card } from '../components/ui/Card';

const metrics = [
  { label: 'Accuracy', value: '91.3%' },
  { label: 'Failed Guesses', value: '8' },
  { label: 'Learning Queue', value: '23' },
  { label: 'Career Count', value: '124k' },
  { label: 'Question Count', value: '320' },
  { label: 'Most Guessed', value: 'Software Engineer' }
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(93,220,255,0.1),_transparent_30%)] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin Console</p>
          <h1 className="mt-2 text-4xl font-semibold">Astrabot Intelligence Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((item) => (
            <Card key={item.label} className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
