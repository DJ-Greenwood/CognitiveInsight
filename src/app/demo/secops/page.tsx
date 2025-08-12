'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Shield,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  Play,
  Pause,
  ExternalLink,
  AlertCircle,
  X,
  Workflow,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  ts: string;
  source: string;
  severity: 'INFO' | 'WARN' | 'ERROR';
  msg: string;
  principal: string;
  ip: string;
}

interface LogFilter {
  severity?: string;
  source?: string;
  ipSubnet?: string;
  timeWindow?: string;
}

interface IncidentCapsule {
  capsule_id: string;
  anchor: string; // trust anchor reference (opaque)
  created_at: string;
  filter_applied: LogFilter;
  metadata_summary: {
    total_events: number;
    severity_breakdown: { [key: string]: number };
    unique_ips: number;
    unique_principals: number;
    time_range: { start: string; end: string };
  };
}

interface VerificationReport {
  ok: boolean;
  message: string;
  verification_time_ms: number;
  report_details: {
    events_verified: number;
    anchor_integrity: boolean;
    filter_compliance: boolean;
    temporal_continuity: boolean;
  };
}

const LOG_SOURCES = ['auth', 'api', 'db', 'network', 'app'];
const SEVERITIES = ['INFO', 'WARN', 'ERROR'];
const PRINCIPALS = ['user-001', 'user-002', 'svc-abc', 'svc-xyz', 'admin-01'];

// OPTIONAL: demo toggle to show external anchoring copy in the UI (kept patent-neutral)
const USE_EXTERNAL_ANCHOR = false;

export default function SecOpsDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [filter, setFilter] = useState<LogFilter>({});
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [filteredEventCount, setFilteredEventCount] = useState(0);
  const [capsule, setCapsule] = useState<IncidentCapsule | null>(null);
  const [verification, setVerification] = useState<VerificationReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const streamInterval = useRef<NodeJS.Timeout>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const maxLogs = 200;

  const generateLogEntry = (): LogEntry => {
    const now = new Date();
    const source = LOG_SOURCES[Math.floor(Math.random() * LOG_SOURCES.length)];
    const severity = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
    const principal = PRINCIPALS[Math.floor(Math.random() * PRINCIPALS.length)];

    const ip = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    const messages = {
      auth: {
        INFO: ['login successful', 'logout completed', 'token refreshed'],
        WARN: ['failed login attempt', 'account locked', 'suspicious activity'],
        ERROR: ['authentication failed', 'session expired', 'invalid credentials']
      },
      api: {
        INFO: ['request processed', 'response cached', 'rate limit ok'],
        WARN: ['slow response', 'rate limit warning', 'deprecated endpoint'],
        ERROR: ['request failed', 'timeout occurred', 'invalid request']
      },
      db: {
        INFO: ['query executed', 'connection established', 'backup completed'],
        WARN: ['slow query', 'connection pool warning', 'high load'],
        ERROR: ['connection failed', 'query timeout', 'deadlock detected']
      },
      network: {
        INFO: ['packet routed', 'connection established', 'bandwidth normal'],
        WARN: ['high latency', 'packet loss detected', 'connection unstable'],
        ERROR: ['connection dropped', 'network unreachable', 'packet flood']
      },
      app: {
        INFO: ['process started', 'task completed', 'health check ok'],
        WARN: ['memory usage high', 'disk space low', 'performance degraded'],
        ERROR: ['process crashed', 'out of memory', 'critical error']
      }
    } as const;

    const sourceMessages = messages[source as keyof typeof messages];
    const messageOptions = sourceMessages[severity as keyof typeof sourceMessages];
    const msg = messageOptions[Math.floor(Math.random() * messageOptions.length)];

    return {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ts: now.toISOString(),
      source,
      severity: severity as 'INFO' | 'WARN' | 'ERROR',
      msg,
      principal,
      ip
    };
  };

  const startLogStream = () => {
    setIsStreaming(true);
    setFilteredEventCount(0);
    setAutoScroll(true);
    streamInterval.current = setInterval(() => {
      const newLog = generateLogEntry();
      setLogs(prevLogs => {
        const updated = [newLog, ...prevLogs];
        return updated.slice(0, maxLogs);
      });
      if (doesLogMatchFilter(newLog, filter)) {
        setFilteredEventCount(prev => prev + 1);
      }
    }, 800);
  };

  const stopLogStream = () => {
    setIsStreaming(false);
    if (streamInterval.current) {
      clearInterval(streamInterval.current);
    }
  };

  const doesLogMatchFilter = (log: LogEntry, currentFilter: LogFilter): boolean => {
    if (currentFilter.severity && currentFilter.severity !== '__ALL__' && log.severity !== currentFilter.severity) return false;
    if (currentFilter.source && currentFilter.source !== '__ALL__' && log.source !== currentFilter.source) return false;
    if (currentFilter.ipSubnet && currentFilter.ipSubnet !== '__ALL__' && !log.ip.startsWith(currentFilter.ipSubnet.replace('__ALL__', ''))) return false;
    return true;
  };

  const applyFilters = () => {
    let filtered = [...logs];

    if (filter.severity && filter.severity !== '__ALL__') {
      filtered = filtered.filter(log => log.severity === filter.severity);
    }
    if (filter.source && filter.source !== '__ALL__') {
      filtered = filtered.filter(log => log.source === filter.source);
    }
    if (filter.ipSubnet && filter.ipSubnet !== '__ALL__') {
      filtered = filtered.filter(log => log.ip.startsWith(filter.ipSubnet!));
    }
    if (filter.timeWindow && filter.timeWindow !== '__ALL__') {
      const now = new Date();
      const windowMs = parseInt(filter.timeWindow) * 60 * 1000;
      const cutoff = new Date(now.getTime() - windowMs);
      filtered = filtered.filter(log => new Date(log.ts) >= cutoff);
    }

    setFilteredLogs(filtered);
    setFilteredEventCount(filtered.length);
  };

  const generateIncidentCapsule = async () => {
    setIsLoading(true);
    setLoadingStep('Analyzing filtered events…');

    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingStep('Generating verifiable proof…');

    await new Promise(resolve => setTimeout(resolve, 700));
    // Patent-neutral copy: trust anchor (internal), external anchoring optional
    setLoadingStep(USE_EXTERNAL_ANCHOR ? 'Recording external trust anchor…' : 'Recording trust anchor…');

    await new Promise(resolve => setTimeout(resolve, 600));
    setLoadingStep('Finalizing capsule…');

    const severityBreakdown = filteredLogs.reduce((acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const uniqueIps = [...new Set(filteredLogs.map(log => log.ip))].length;
    const uniquePrincipals = [...new Set(filteredLogs.map(log => log.principal))].length;

    const timeRange = filteredLogs.length > 0
      ? { start: filteredLogs[filteredLogs.length - 1].ts, end: filteredLogs[0].ts }
      : { start: '', end: '' };

    const incidentCapsule: IncidentCapsule = {
      capsule_id: `inc_${Math.random().toString(36).substr(2, 16)}`,
      anchor: `anch_${Math.random().toString(36).substr(2, 24)}`, // opaque handle; no crypto disclosed
      created_at: new Date().toISOString(),
      filter_applied: filter,
      metadata_summary: {
        total_events: filteredLogs.length,
        severity_breakdown: severityBreakdown,
        unique_ips: uniqueIps,
        unique_principals: uniquePrincipals,
        time_range: timeRange
      }
    };

    setCapsule(incidentCapsule);
    setIsLoading(false);
    setLoadingStep('');
  };

  const verifyIncidentCapsule = async () => {
    if (!capsule) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const verificationReport: VerificationReport = {
      ok: true,
      message: 'Incident capsule verified successfully',
      verification_time_ms: Math.floor(Math.random() * 200) + 100,
      report_details: {
        events_verified: capsule.metadata_summary.total_events,
        anchor_integrity: true,
        filter_compliance: true,
        temporal_continuity: true
      }
    };

    setVerification(verificationReport);
    setIsLoading(false);
  };

  const resetDemo = () => {
    stopLogStream();
    setLogs([]);
    setFilteredLogs([]);
    setCapsule(null);
    setVerification(null);
    setFilter({});
    setAutoScroll(true);
    setFilteredEventCount(0);
  };

  useEffect(() => {
    return () => {
      if (streamInterval.current) {
        clearInterval(streamInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, filter]);

  // Detect user scrolling and pause autoscroll
  useEffect(() => {
    const vp = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement | null;
    if (!vp) return;

    const onScroll = () => {
      if (vp.scrollTop > 8 && autoScroll) setAutoScroll(false);
    };

    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => vp.removeEventListener('scroll', onScroll);
  }, [autoScroll]);

  // Smooth, no-jump behavior: only pin to top if user hasn’t scrolled away
  useEffect(() => {
    if (!isStreaming || !autoScroll || logs.length === 0) return;
    const vp = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement | null;
    if (vp && vp.scrollTop <= 8) {
      requestAnimationFrame(() => {
        // keep content pinned without triggering layout jumps
        vp.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      });
    }
  }, [logs, isStreaming, autoScroll]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'ERROR':
        return 'destructive';
      case 'WARN':
        return 'secondary';
      case 'INFO':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container py-12 md:py-24 max-w-7xl">
      {/* Patent Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <FileText className="h-5 w-5" />
          <p className="text-sm">
            <strong>Patent-Pending Demo:</strong> This demonstrates selective proof generation concepts. Implementation specifics are intentionally abstracted.
          </p>
        </div>
      </div>

      {/* Simulation Notice */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🛡️</div>
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              Interactive Simulation: SIEM Log Processing & Incident Capsule Generation
            </h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              This demo simulates the Insight™ framework's cybersecurity log processing capabilities. All security logs are 
              <strong> synthetically generated</strong> and the incident capsule creation process is a <strong>simulated demonstration</strong> — 
              no actual security data, real SIEM systems, or live threat intelligence is processed.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <Shield className="w-4 h-4 mr-2" />
          Cybersecurity Log Proofs Demo
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          SIEM Incident Capsules
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Demonstrates how organizations can meet regulatory log retention requirements without storing sensitive raw logs — while
          still providing cryptographically verifiable evidence to auditors.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Log Stream & Filters */}
        <div className="space-y-6">
          {/* Log Stream Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Security Log Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 items-center flex-wrap">
                {!isStreaming ? (
                  <Button onClick={startLogStream} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Log Stream
                  </Button>
                ) : (
                  <Button onClick={stopLogStream} variant="destructive" className="flex items-center gap-2">
                    <Pause className="h-4 w-4" />
                    Stop Stream
                  </Button>
                )}
                <Badge variant="outline">{logs.length} events</Badge>
                {filteredEventCount > 0 && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {filteredEventCount} filtered
                  </Badge>
                )}
                {!autoScroll && isStreaming && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                    Auto-scroll paused
                  </Badge>
                )}
              </div>

              <ScrollArea ref={scrollAreaRef} className="h-64 border rounded-lg p-4">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No logs yet. Start the stream to begin receiving events.</p>
                ) : (
                  <div className="space-y-2">
                    {logs.slice(0, 20).map((log, index) => {
                      const matchesCurrentFilter = doesLogMatchFilter(log, filter);
                      return (
                        <div
                          key={log.id}
                          className={cn(
                            'text-xs font-mono p-2 rounded transition-all duration-300',
                            matchesCurrentFilter
                              ? log.severity === 'ERROR'
                                ? 'bg-red-50 border-l-4 border-red-500'
                                : log.severity === 'WARN'
                                ? 'bg-yellow-50 border-l-4 border-yellow-500'
                                : 'bg-blue-50 border-l-4 border-blue-500'
                              : 'bg-muted opacity-60',
                            index === 0 && isStreaming ? 'animate-in fade-in slide-in-from-top-2 duration-500' : ''
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant={getSeverityBadge(log.severity)}
                              className={cn('text-xs px-1 py-0', log.severity === 'ERROR' && matchesCurrentFilter && 'bg-red-600 text-white')}
                            >
                              {log.severity}
                            </Badge>
                            <span className="text-muted-foreground">{new Date(log.ts).toLocaleTimeString()}</span>
                            <span className="font-medium">{log.source}</span>
                            {matchesCurrentFilter && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                ✓ Match
                              </Badge>
                            )}
                          </div>
                          <div className={matchesCurrentFilter ? 'text-gray-900' : 'text-muted-foreground'}>
                            {log.principal}@{log.ip}: {log.msg}
                          </div>
                        </div>
                      );
                    })}
                    {logs.length > 20 && <p className="text-xs text-muted-foreground text-center py-2">... and {logs.length - 20} more events</p>}
                  </div>
                )}
              </ScrollArea>

              {!autoScroll && (
                <div className="flex justify-end pt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const vp = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement | null;
                      if (vp) {
                        vp.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        setAutoScroll(true);
                      }
                    }}
                  >
                    Jump to live
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Incident Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select
                    value={filter.severity || '__ALL__'}
                    onValueChange={value => setFilter(prev => ({ ...prev, severity: value === '__ALL__' ? undefined : value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All severities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ALL__">All severities</SelectItem>
                      <SelectItem value="ERROR">ERROR</SelectItem>
                      <SelectItem value="WARN">WARN</SelectItem>
                      <SelectItem value="INFO">INFO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="source">Log Source</Label>
                  <Select
                    value={filter.source || '__ALL__'}
                    onValueChange={value => setFilter(prev => ({ ...prev, source: value === '__ALL__' ? undefined : value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ALL__">All sources</SelectItem>
                      {LOG_SOURCES.map(source => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ipSubnet">IP Subnet</Label>
                  <Input
                    id="ipSubnet"
                    placeholder="e.g. 10.2"
                    value={filter.ipSubnet || ''}
                    onChange={e => setFilter(prev => ({ ...prev, ipSubnet: e.target.value || undefined }))}
                  />
                </div>

                <div>
                  <Label htmlFor="timeWindow">Time Window (minutes)</Label>
                  <Select
                    value={filter.timeWindow || '__ALL__'}
                    onValueChange={value => setFilter(prev => ({ ...prev, timeWindow: value === '__ALL__' ? undefined : value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ALL__">All time</SelectItem>
                      <SelectItem value="5">Last 5 minutes</SelectItem>
                      <SelectItem value="15">Last 15 minutes</SelectItem>
                      <SelectItem value="60">Last hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Filtered Results:</span>
                  <Badge variant="outline">{filteredLogs.length} events match</Badge>
                </div>

                {filteredLogs.length > 0 && (
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>ERROR events:</span>
                      <span className="text-red-600">{filteredLogs.filter(l => l.severity === 'ERROR').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WARN events:</span>
                      <span className="text-yellow-600">{filteredLogs.filter(l => l.severity === 'WARN').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>INFO events:</span>
                      <span className="text-blue-600">{filteredLogs.filter(l => l.severity === 'INFO').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unique IPs:</span>
                      <span>{[...new Set(filteredLogs.map(l => l.ip))].length}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Capsule Generation & Verification */}
        <div className="space-y-6">
          {/* Capsule Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Generate Incident Capsule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create a verifiable proof capsule for the filtered security events. The capsule contains integrity data without exposing
                sensitive log content.
              </p>

              <Button onClick={generateIncidentCapsule} disabled={isLoading || filteredLogs.length === 0 || capsule !== null} className="w-full">
                {isLoading && !capsule ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {loadingStep}
                  </div>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Generate Incident Capsule
                  </>
                )}
              </Button>

              {filteredLogs.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Start the log stream and apply filters to generate an incident capsule.</AlertDescription>
                </Alert>
              )}

              {capsule && (
                <div className="relative">
                  {/* Digital Capsule Card */}
                  <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-6 rounded-xl border border-blue-500/20 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-400" />
                          <span className="font-bold text-lg">Proof Capsule</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Verified ✓</Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">Capsule ID</div>
                          <div className="font-mono text-sm bg-black/20 p-2 rounded border border-white/10">{capsule.capsule_id}</div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-300">{capsule.metadata_summary.total_events}</div>
                            <div className="text-xs text-gray-300">Events</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-300">{capsule.metadata_summary.unique_ips}</div>
                            <div className="text-xs text-gray-300">Unique IPs</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-indigo-300">{new Date(capsule.created_at).toLocaleTimeString()}</div>
                            <div className="text-xs text-gray-300">Generated</div>
                          </div>
                        </div>

                        {/* Severity Indicators */}
                        <div className="flex gap-2 justify-center pt-2">
                          {Object.entries(capsule.metadata_summary.severity_breakdown).map(([severity, count]) => (
                            <div
                              key={severity}
                              className={cn(
                                'px-2 py-1 rounded text-xs font-medium',
                                severity === 'ERROR'
                                  ? 'bg-red-500/20 text-red-300'
                                  : severity === 'WARN'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-blue-500/20 text-blue-300'
                              )}
                            >
                              {severity}: {count}
                            </div>
                          ))}
                        </div>

                        {/* Trust Anchor (patent-neutral) */}
                        <div className="border-t border-white/10 pt-3">
                          <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                            {USE_EXTERNAL_ANCHOR ? 'External Trust Anchor' : 'Trust Anchor'}
                          </div>
                          <div className="font-mono text-xs bg-black/20 p-2 rounded border border-white/10 break-all">{capsule.anchor}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 mb-1">You just generated a verifiable proof without storing raw logs!</h4>
                        <p className="text-sm text-green-700 mb-3">
                          This capsule provides consistent, audit-ready evidence while protecting sensitive data. Want to see it with your SIEM?
                        </p>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Book a Demo →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification */}
          {capsule && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Verify Capsule Integrity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Verify the capsule integrity and scope without exposing the original log content. Results below are independently checkable.
                </p>

                <Button onClick={verifyIncidentCapsule} disabled={isLoading || verification !== null} className="w-full">
                  {isLoading && !verification ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Verifying Capsule...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify Incident Capsule
                    </>
                  )}
                </Button>

                {verification && (
                  <div
                    className={cn(
                      'p-4 rounded-lg border',
                      verification.ok
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                    )}
                  >
                    <p className={cn('text-sm font-medium mb-2', verification.ok ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200')}>
                      {verification.ok ? '✅ Verification Successful' : '❌ Verification Failed'}
                    </p>

                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Message:</strong> {verification.message}
                      </div>
                      <div>
                        <strong>Verification Time:</strong> {verification.verification_time_ms}ms
                      </div>
                      <div>
                        <strong>Events Verified:</strong> {verification.report_details.events_verified}
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-2 border-t">
                        <div className="flex items-center gap-2">
                          {verification.report_details.anchor_integrity ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )}
                          Anchor Integrity Check
                        </div>
                        <div className="flex items-center gap-2">
                          {verification.report_details.filter_compliance ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )}
                          Filter Compliance Verified
                        </div>
                        <div className="flex items-center gap-2">
                          {verification.report_details.temporal_continuity ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )}
                          Temporal Continuity Verified
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Demo Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Demo Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {verification && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Demo Complete!</strong> You’ve successfully generated and verified a security incident capsule from filtered log events.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-2">
                <Button onClick={resetDemo} variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Reset Demo
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact?demo=secops-logs" className="inline-flex items-center gap-2">
                    Request Early Access
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Before vs After Insight Section (integrated) */}
      <section className="space-y-10 mt-16 pt-8 border-t">
        <div className="text-center space-y-3">
          <Badge variant="secondary">Before vs After</Badge>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">From “Store Everything” to “Prove What Matters”</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Insight™ replaces blanket log retention with selective, verifiable proof capsules—preserving compliance while cutting risk and cost.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-red-200 bg-red-50/60">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Traditional SIEM</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Storage Footprint</span>
                  <span className="font-mono">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Prep Time</span>
                  <span className="font-mono">Hours → Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Exposure Surface</span>
                  <span className="font-mono">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                <span className="font-semibold">Shift in Approach</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">Move from eager, full-data storage to on-demand, selective proofs that are independently verifiable.</div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/60">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">With Insight™</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Storage Footprint</span>
                  <span className="font-mono">~10–20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Prep Time</span>
                  <span className="font-mono">Seconds → Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Exposure Surface</span>
                  <span className="font-mono">Low</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-red-200 bg-red-50/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Database className="h-5 w-5" />
                Traditional SIEM Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Capture" value="Ingest & store all raw logs indefinitely" bad />
              <Row label="Filtering" value="Applied later during search; storage unchanged" />
              <Row label="Audit Evidence" value="Reconstruct from raw data exports & manual queries" bad />
              <Row label="Verification" value="Trust based on access to original data sets" />
              <Row label="Risk" value="Large sensitive data lake; access sprawl" bad />
              <Row label="Cost" value="High storage + egress + indexing" bad />
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="h-5 w-5" />
                Insight™ Proof Capsule Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Capture" value="Stream logs; retain only selected, policy-relevant events" good />
              <Row label="Filtering" value="Applied up front; reduces what must be retained" good />
              <Row label="Audit Evidence" value="On-demand, cryptographically verifiable capsules" good />
              <Row label="Verification" value="Independent integrity checks—no raw data exposure" good />
              <Row label="Risk" value="Minimal retained data; smaller blast radius" good />
              <Row label="Cost" value="~80–90% storage reduction; faster audits" good />
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">For SecOps</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <Bullet>Keep using your SIEM; Insight™ layers on top.</Bullet>
              <Bullet>Capture only incidents matching policy filters.</Bullet>
              <Bullet>Generate verifiable incident capsules on demand.</Bullet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">For Compliance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <Bullet>Proofs without raw log access or exports.</Bullet>
              <Bullet>Consistent, tamper-evident evidence packages.</Bullet>
              <Bullet>Traceable receipts and verification reports.</Bullet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">For Security Leaders</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <Bullet>Reduce data retention surface area & liability.</Bullet>
              <Bullet>Cut storage & audit prep costs materially.</Bullet>
              <Bullet>Demonstrate provable governance to regulators.</Bullet>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Minimal Disclosure, Maximum Verifiability
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Insight™ creates a compact, verifiable capsule that references selected events and includes integrity data required for independent
              verification—without revealing raw log content. Public details are intentionally abstracted to protect patent claims.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Selective scope:</strong> Events included only if they match active policy filters.
              </li>
              <li>
                <strong>Independent checks:</strong> Verifiers confirm integrity and scope without raw data.
              </li>
              <li>
                <strong>Anchor options:</strong> Private trust store by default; external anchoring optional.
              </li>
            </ul>
            <p className="text-xs mt-2">
              <em>Patent-pending. Implementation details are abstracted in the UI and docs.</em>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

/* ---------- Small helpers (kept here for single-file drop-in) ---------- */

function Row({ label, value, good, bad }: { label: string; value: string; good?: boolean; bad?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-muted-foreground">{label}</div>
      <div className={cn('text-right', good && 'text-green-700', bad && 'text-red-700')}>{value}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
      <span>{children}</span>
    </div>
  );
}
