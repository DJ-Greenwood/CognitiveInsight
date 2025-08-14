import { Monitor, Shield, Receipt, BookCheck } from 'lucide-react';

export function ComingSoonDashboard() {
  return (
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-3 mb-6">
        <Monitor className="w-8 h-8 text-primary" />
        <h2 className="font-headline text-3xl font-bold">Coming Soon – Dashboard Mockup</h2>
      </div>
      <p className="text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
        Preview of the Insight™ Dashboard — a visual interface for monitoring verification results, 
        proof capsule statuses, and compliance metrics. Real-time visibility into your organization's 
        cryptographic audit trails and governance status.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-16 border-2 border-dashed border-slate-300 dark:border-slate-600 min-h-96 flex flex-col items-center justify-center">
          <div className="text-6xl mb-6">📊</div>
          <h3 className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-3">
            Interactive Dashboard Preview
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-center">
            Comprehensive monitoring and management interface for Insight™ Framework deployments
          </p>
          <div className="grid grid-cols-3 gap-6 text-sm text-slate-400">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <span>Verification Status</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <span>Proof Capsules</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <BookCheck className="w-6 h-6" />
              </div>
              <span>Compliance Metrics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
