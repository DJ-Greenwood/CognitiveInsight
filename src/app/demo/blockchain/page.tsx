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
  ExternalLink,
  AlertCircle,
  X,
  Link2,
  Anchor,
  Globe,
  Hash,
  Timer,
  Users,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';

interface DataEntry {
  id: string;
  timestamp: string;
  type: string;
  category: string;
  status: 'PROCESSED' | 'PENDING' | 'FLAGGED';
  description: string;
  value?: string;
}

interface DataFilter {
  type?: string;
  category?: string;
  status?: string;
  dateRange?: string;
}

interface ProofCapsule {
  capsule_id: string;
  created_at: string;
  filter_applied: DataFilter;
  metadata_summary: {
    total_records: number;
    status_breakdown: { [key: string]: number };
    unique_types: number;
    time_range: { start: string; end: string };
  };
  proof_hash: string;
}

interface BlockchainAnchor {
  transaction_hash: string;
  block_number: number;
  block_timestamp: string;
  network: string;
  confirmation_count: number;
  gas_used: string;
  explorer_url: string;
}

interface VerificationReport {
  ok: boolean;
  message: string;
  verification_time_ms: number;
  blockchain_confirmed: boolean;
  report_details: {
    records_verified: number;
    hash_integrity: boolean;
    blockchain_anchor_valid: boolean;
    timestamp_verified: boolean;
  };
}

// Simulated data sources
const DATA_TYPES = ['compliance-check', 'quality-audit', 'transaction-batch', 'regulatory-filing'];
const CATEGORIES = ['financial', 'operational', 'security', 'regulatory'];
const STATUSES = ['PROCESSED', 'PENDING', 'FLAGGED'];

const SAMPLE_DATA_TEMPLATES = {
  'compliance-check': [
    'KYC verification completed',
    'AML screening passed',
    'Risk assessment updated',
    'Document validation finished',
    'Regulatory reporting submitted'
  ],
  'quality-audit': [
    'Product inspection completed',
    'Manufacturing standard verified',
    'Supply chain validation passed',
    'Safety protocol confirmed',
    'Quality metrics recorded'
  ],
  'transaction-batch': [
    'Payment processing completed',
    'Settlement confirmation received',
    'Fraud check cleared',
    'Reconciliation matched',
    'Audit trail generated'
  ],
  'regulatory-filing': [
    'Tax submission completed',
    'Compliance report filed',
    'Regulatory approval received',
    'License renewal processed',
    'Audit documentation submitted'
  ]
};

export default function BlockchainAnchoringDemo() {
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [filter, setFilter] = useState<DataFilter>({});
  const [filteredData, setFilteredData] = useState<DataEntry[]>([]);
  const [capsule, setCapsule] = useState<ProofCapsule | null>(null);
  const [anchor, setAnchor] = useState<BlockchainAnchor | null>(null);
  const [verification, setVerification] = useState<VerificationReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('compliance-check');

  // Generate sample data entries
  const generateDataEntries = (type: string, count: number = 50): DataEntry[] => {
    const templates = SAMPLE_DATA_TEMPLATES[type as keyof typeof SAMPLE_DATA_TEMPLATES] || SAMPLE_DATA_TEMPLATES['compliance-check'];
    const entries: DataEntry[] = [];
    
    for (let i = 0; i < count; i++) {
      const now = new Date();
      const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
      const description = templates[Math.floor(Math.random() * templates.length)];
      
      entries.push({
        id: `${type}_${timestamp.getTime()}_${Math.random().toString(36).substr(2, 6)}`,
        timestamp: timestamp.toISOString(),
        type,
        category,
        status: status as 'PROCESSED' | 'PENDING' | 'FLAGGED',
        description,
        value: Math.random() > 0.7 ? `$${(Math.random() * 100000).toFixed(2)}` : undefined
      });
    }
    
    return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  // Load dataset
  const loadDataset = () => {
    const entries = generateDataEntries(selectedDataset);
    setDataEntries(entries);
    setCapsule(null);
    setAnchor(null);
    setVerification(null);
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...dataEntries];

    if (filter.type && filter.type !== "__ALL__") {
      filtered = filtered.filter(entry => entry.type === filter.type);
    }

    if (filter.category && filter.category !== "__ALL__") {
      filtered = filtered.filter(entry => entry.category === filter.category);
    }

    if (filter.status && filter.status !== "__ALL__") {
      filtered = filtered.filter(entry => entry.status === filter.status);
    }

    if (filter.dateRange && filter.dateRange !== "__ALL__") {
      const now = new Date();
      const daysBack = parseInt(filter.dateRange);
      const cutoff = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(entry => new Date(entry.timestamp) >= cutoff);
    }

    setFilteredData(filtered);
  };

  // Generate proof capsule
  const generateProofCapsule = async () => {
    setIsLoading(true);
    setLoadingStep('Analyzing filtered records...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingStep('Generating cryptographic proof...');
    
    await new Promise(resolve => setTimeout(resolve, 700));
    setLoadingStep('Creating tamper-evident capsule...');
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setLoadingStep('Finalizing proof capsule...');

    const statusBreakdown = filteredData.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const uniqueTypes = [...new Set(filteredData.map(entry => entry.type))].length;

    const timeRange = filteredData.length > 0 ? {
      start: filteredData[filteredData.length - 1].timestamp,
      end: filteredData[0].timestamp
    } : { start: '', end: '' };

    const proofCapsule: ProofCapsule = {
      capsule_id: `proof_${Math.random().toString(36).substr(2, 16)}`,
      created_at: new Date().toISOString(),
      filter_applied: filter,
      metadata_summary: {
        total_records: filteredData.length,
        status_breakdown: statusBreakdown,
        unique_types: uniqueTypes,
        time_range: timeRange
      },
      proof_hash: `0x${Math.random().toString(36).substr(2, 16)}${Math.random().toString(36).substr(2, 16)}${Math.random().toString(36).substr(2, 16)}`
    };

    setCapsule(proofCapsule);
    setIsLoading(false);
    setLoadingStep('');
  };

  // Anchor to blockchain
  const anchorToBlockchain = async () => {
    if (!capsule) return;

    setIsLoading(true);
    setLoadingStep('Preparing blockchain transaction...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingStep('Broadcasting to network...');
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoadingStep('Waiting for confirmation...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingStep('Anchor confirmed!');

    const blockchainAnchor: BlockchainAnchor = {
      transaction_hash: `0x${Math.random().toString(36).substr(2, 16)}${Math.random().toString(36).substr(2, 16)}${Math.random().toString(36).substr(2, 16)}`,
      block_number: 18500000 + Math.floor(Math.random() * 10000),
      block_timestamp: new Date().toISOString(),
      network: 'Ethereum Mainnet',
      confirmation_count: 12,
      gas_used: `${(Math.random() * 50000 + 21000).toFixed(0)}`,
      explorer_url: `https://etherscan.io/tx/0x${Math.random().toString(36).substr(2, 16)}`
    };

    setAnchor(blockchainAnchor);
    setIsLoading(false);
    setLoadingStep('');
  };

  // Verify anchored capsule
  const verifyAnchoredCapsule = async () => {
    if (!capsule || !anchor) return;

    setIsLoading(true);
    setLoadingStep('Querying blockchain...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingStep('Verifying transaction...');
    
    await new Promise(resolve => setTimeout(resolve, 600));

    const verificationReport: VerificationReport = {
      ok: true,
      message: "Blockchain-anchored proof capsule verified successfully",
      verification_time_ms: Math.floor(Math.random() * 300) + 150,
      blockchain_confirmed: true,
      report_details: {
        records_verified: capsule.metadata_summary.total_records,
        hash_integrity: true,
        blockchain_anchor_valid: true,
        timestamp_verified: true
      }
    };

    setVerification(verificationReport);
    setIsLoading(false);
    setLoadingStep('');
  };

  // Reset demo
  const resetDemo = () => {
    setDataEntries([]);
    setFilteredData([]);
    setCapsule(null);
    setAnchor(null);
    setVerification(null);
    setFilter({});
    setLoadingStep('');
  };

  useEffect(() => {
    loadDataset();
  }, [selectedDataset]);

  useEffect(() => {
    applyFilters();
  }, [dataEntries, filter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PROCESSED': return 'default';
      case 'PENDING': return 'secondary';
      case 'FLAGGED': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROCESSED': return 'text-green-600 dark:text-green-400';
      case 'PENDING': return 'text-yellow-600 dark:text-yellow-400';
      case 'FLAGGED': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="container py-12 md:py-24 max-w-7xl">
      {/* Patent Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <FileText className="h-5 w-5" />
          <p className="text-sm">
            <strong>Patent-Pending Demo:</strong> This demonstrates blockchain anchoring concepts for audit evidence. 
            Actual cryptographic implementations and blockchain interactions are proprietary.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <Anchor className="w-4 h-4 mr-2" />
          Blockchain Anchoring Proof Demo
        </Badge>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Immutable Audit Evidence
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Transform compliance data into tamper-proof, blockchain-anchored proof capsules that provide 
          independent verification without exposing sensitive information.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Dataset Selection & Filtering */}
        <div className="space-y-6">
          {/* Dataset Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Select Compliance Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dataset">Dataset Type</Label>
                <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance-check">Compliance Checks</SelectItem>
                    <SelectItem value="quality-audit">Quality Audits</SelectItem>
                    <SelectItem value="transaction-batch">Transaction Batches</SelectItem>
                    <SelectItem value="regulatory-filing">Regulatory Filings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={loadDataset} className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Load Dataset ({dataEntries.length} records)
              </Button>
            </CardContent>
          </Card>

          {/* Data Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Data Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 border rounded-lg p-4">
                {dataEntries.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Select a dataset to preview records
                  </p>
                ) : (
                  <div className="space-y-2">
                    {dataEntries.slice(0, 10).map((entry) => (
                      <div key={entry.id} className="text-xs p-2 bg-muted rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getStatusBadge(entry.status)} className="text-xs">
                            {entry.status}
                          </Badge>
                          <span className="text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                          <span className="font-medium capitalize">{entry.category}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {entry.description} {entry.value && `(${entry.value})`}
                        </div>
                      </div>
                    ))}
                    {dataEntries.length > 10 && (
                      <p className="text-xs text-muted-foreground text-center py-2">
                        ... and {dataEntries.length - 10} more records
                      </p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Compliance Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Record Status</Label>
                  <Select value={filter.status || '__ALL__'} onValueChange={(value) => 
                    setFilter(prev => ({ ...prev, status: value === '__ALL__' ? undefined : value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ALL__">All statuses</SelectItem>
                      <SelectItem value="PROCESSED">Processed</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="FLAGGED">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={filter.category || '__ALL__'} onValueChange={(value) => 
                    setFilter(prev => ({ ...prev, category: value === '__ALL__' ? undefined : value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ALL__">All categories</SelectItem>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>Date Range</Label>
                  <Select value={filter.dateRange || '__ALL__'} onValueChange={(value) => 
                    setFilter(prev => ({ ...prev, dateRange: value === '__ALL__' ? undefined : value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="All dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__ALL__">All dates</SelectItem>
                      <SelectItem value="1">Last 24 hours</SelectItem>
                      <SelectItem value="3">Last 3 days</SelectItem>
                      <SelectItem value="7">Last 7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Filtered Results:</span>
                  <Badge variant="outline">{filteredData.length} records selected</Badge>
                </div>
                
                {filteredData.length > 0 && (
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>PROCESSED:</span>
                      <span className="text-green-600">{filteredData.filter(d => d.status === 'PROCESSED').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PENDING:</span>
                      <span className="text-yellow-600">{filteredData.filter(d => d.status === 'PENDING').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FLAGGED:</span>
                      <span className="text-red-600">{filteredData.filter(d => d.status === 'FLAGGED').length}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Proof Generation & Blockchain Anchoring */}
        <div className="space-y-6">
          {/* Step 1: Generate Proof Capsule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Step 1: Generate Proof Capsule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create a cryptographic proof capsule containing metadata about your filtered records 
                without exposing the actual sensitive data.
              </p>
              
              <Button 
                onClick={generateProofCapsule} 
                disabled={isLoading || filteredData.length === 0 || capsule !== null}
                className="w-full"
              >
                {isLoading && !capsule ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {loadingStep}
                  </div>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Generate Proof Capsule
                  </>
                )}
              </Button>

              {filteredData.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Load a dataset and apply filters to generate a proof capsule.
                  </AlertDescription>
                </Alert>
              )}

              {capsule && (
                <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-6 rounded-xl border border-blue-500/20 shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-400" />
                        <span className="font-bold text-lg">Proof Capsule</span>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                        Ready for Anchoring
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">Capsule ID</div>
                        <div className="font-mono text-sm bg-black/20 p-2 rounded border border-white/10">
                          {capsule.capsule_id}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-300">{capsule.metadata_summary.total_records}</div>
                          <div className="text-xs text-gray-300">Records</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-300">{capsule.metadata_summary.unique_types}</div>
                          <div className="text-xs text-gray-300">Types</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-indigo-300">{new Date(capsule.created_at).toLocaleTimeString()}</div>
                          <div className="text-xs text-gray-300">Generated</div>
                        </div>
                      </div>
                      
                      <div className="border-t border-white/10 pt-3">
                        <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">Proof Hash</div>
                        <div className="font-mono text-xs bg-black/20 p-2 rounded border border-white/10 break-all">
                          {capsule.proof_hash}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Anchor to Blockchain */}
          {capsule && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Anchor className="h-5 w-5" />
                  Step 2: Anchor to Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Anchor your proof capsule to the blockchain for immutable timestamping 
                  and independent verification by any third party.
                </p>
                
                <Button 
                  onClick={anchorToBlockchain} 
                  disabled={isLoading || anchor !== null}
                  className="w-full"
                >
                  {isLoading && !anchor ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {loadingStep}
                    </div>
                  ) : (
                    <>
                      <Anchor className="h-4 w-4 mr-2" />
                      Anchor to Blockchain
                    </>
                  )}
                </Button>

                {anchor && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-900 dark:text-emerald-100">
                        Blockchain Anchor Confirmed
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Transaction Hash:</strong>
                        <div className="font-mono text-xs bg-background p-2 rounded mt-1 break-all">
                          {anchor.transaction_hash}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <strong>Block:</strong> #{anchor.block_number.toLocaleString()}
                        </div>
                        <div>
                          <strong>Network:</strong> {anchor.network}
                        </div>
                        <div>
                          <strong>Confirmations:</strong> {anchor.confirmation_count}
                        </div>
                        <div>
                          <strong>Gas Used:</strong> {anchor.gas_used}
                        </div>
                      </div>
                      
                      <div>
                        <strong>Blockchain Timestamp:</strong> {new Date(anchor.block_timestamp).toLocaleString()}
                      </div>
                      
                      <Button asChild size="sm" variant="outline" className="w-full mt-3">
                        <Link href={anchor.explorer_url} target="_blank" className="inline-flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View on Blockchain Explorer
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Independent Verification */}
          {anchor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Step 3: Independent Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Verify the anchored proof capsule independently using blockchain records. 
                  Any auditor can perform this verification without accessing your original data.
                </p>
                
                <Button 
                  onClick={verifyAnchoredCapsule} 
                  disabled={isLoading || verification !== null}
                  className="w-full"
                >
                  {isLoading && !verification ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {loadingStep}
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify Blockchain Anchor
                    </>
                  )}
                </Button>

                {verification && (
                  <div className={`p-4 rounded-lg border ${
                    verification.ok 
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                  }`}>
                    <p className={`text-sm font-medium mb-2 ${
                      verification.ok ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    }`}>
                      {verification.ok ? '✅ Verification Successful' : '❌ Verification Failed'}
                    </p>
                    
                    <div className="text-sm space-y-2">
                      <div><strong>Message:</strong> {verification.message}</div>
                      <div><strong>Verification Time:</strong> {verification.verification_time_ms}ms</div>
                      <div><strong>Records Verified:</strong> {verification.report_details.records_verified}</div>
                      
                      <div className="grid grid-cols-1 gap-2 pt-2 border-t">
                        <div className="flex items-center gap-2">
                          {verification.report_details.hash_integrity ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                          Proof Hash Integrity Verified
                        </div>
                        <div className="flex items-center gap-2">
                          {verification.report_details.blockchain_anchor_valid ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                          Blockchain Anchor Valid
                        </div>
                        <div className="flex items-center gap-2">
                          {verification.report_details.timestamp_verified ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                          Timestamp Integrity Verified
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Demo Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Demo Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {verification && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Demo Complete!</strong> You've successfully created and verified 
                    a blockchain-anchored proof capsule for compliance evidence.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col gap-2">
                <Button onClick={resetDemo} variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Reset Demo
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact?demo=blockchain-anchoring" className="inline-flex items-center gap-2">
                    Request Early Access
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What This Demonstrates */}
      <div className="mt-16 pt-8 border-t">
        <h2 className="font-headline text-2xl font-bold text-center mb-8">What This Demonstrates</h2>
        
        {/* Before vs After Section */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="text-center">
              <CardTitle className="text-lg text-red-800 flex items-center justify-center gap-2">
                <X className="h-5 w-5" />
                Before: Centralized Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Single point of failure for audit evidence</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>No independent verification possible</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Timestamp manipulation risks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Trust depends on single organization</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="text-center">
              <CardTitle className="text-lg text-green-800 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                After: Blockchain-Anchored Proofs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Timer className="h-4 w-4 flex-shrink-0" />
                <span>Immutable, tamper-proof timestamps</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span>Multi-party trust through decentralization</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span>Independent verification by any party</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <EyeOff className="h-4 w-4 flex-shrink-0" />
                <span>Privacy-preserving design (no raw data on-chain)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Benefits */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="text-center">
            <CardHeader>
              <Timer className="h-8 w-8 mx-auto text-blue-600" />
              <CardTitle className="text-lg">Tamper-Proof Timestamps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Blockchain anchoring provides cryptographically secure timestamps that cannot be backdated or manipulated.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Globe className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">Independent Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Any auditor can verify proof capsules using public blockchain data without needing to trust your organization.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-purple-600" />
              <CardTitle className="text-lg">Multi-Party Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Decentralized blockchain networks eliminate single points of failure and create shared trust infrastructure.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <EyeOff className="h-8 w-8 mx-auto text-orange-600" />
              <CardTitle className="text-lg">Privacy-Preserving</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Only cryptographic proofs are stored on-chain. Your sensitive data remains private and secure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Educational Callout */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Hash className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Why Blockchain Anchoring Matters for Compliance
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Traditional audit logs can be modified by system administrators or lost due to technical failures. 
                Blockchain anchoring creates an immutable record that proves your compliance data existed at a 
                specific point in time and hasn't been tampered with since creation.
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This approach meets the highest regulatory standards while protecting your sensitive data - 
                only cryptographic fingerprints go on-chain, never the actual compliance records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
