import { Shield, Zap, CheckCircle } from 'lucide-react';

const valueProps = [
  {
    icon: Shield,
    title: 'Trust',
    description: 'Independently verifiable integrity for any record or process. Build confidence through cryptographic proof.'
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'On-demand proofs reduce storage and processing by 90%+. Scale verification without infrastructure costs.'
  },
  {
    icon: CheckCircle,
    title: 'Compliance',
    description: 'Easily meet verification and reporting requirements across multiple regulatory frameworks.'
  }
];

export function WhyInsightMatters() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
            Why Insight™ Matters
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center text-white">
          {valueProps.map((prop) => (
            <div key={prop.title}>
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                <prop.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{prop.title}</h3>
              <p className="text-blue-100 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
