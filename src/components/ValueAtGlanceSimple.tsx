import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const valueMetrics = [
  {
    metric: '90%',
    title: 'Cost Reduction',
    description: 'Selective, on-demand auditing cuts storage & ops',
    color: 'text-green-600'
  },
  {
    metric: '1000×',
    title: 'Faster Registration',
    description: 'Avoid eager logging overhead',
    color: 'text-blue-600'
  },
  {
    metric: '99.9%',
    title: 'Audit-Ready',
    description: 'Cryptographic integrity by design',
    color: 'text-purple-600'
  }
];

export function ValueAtGlanceSimple() {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-sky-950/20 dark:via-blue-950/20 dark:to-sky-900/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-sky-900 dark:text-sky-100">
            Value at a Glance
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 max-w-5xl mx-auto">
          {valueMetrics.map((metric) => (
            <Card key={metric.title} className="text-center border-sky-200 dark:border-sky-800 bg-white/80 dark:bg-sky-950/40 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className={`text-4xl font-bold ${metric.color} mt-2`}>
                  {metric.metric}
                </div>
                <CardTitle className="font-headline text-xl text-sky-900 dark:text-sky-100">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700 dark:text-sky-300 text-sm leading-relaxed">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-sky-600 dark:text-sky-400 max-w-2xl mx-auto">
            * Internal benchmarks & simulations; results vary by workload and configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
