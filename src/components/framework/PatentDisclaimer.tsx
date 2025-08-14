import { AlertTriangle } from 'lucide-react';

export function PatentDisclaimer() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">
            Patent-Pending Notice
          </h3>
          <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
            Insight™ Framework is protected under active U.S. patent applications. Certain technical details are 
            intentionally omitted from this site to preserve intellectual property. Contact us for high-level 
            summaries or executive briefings.
          </p>
        </div>
      </div>
    </div>
  );
}
