'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  FileText, 
  Database, 
  Key, 
  Receipt,
  TrendingUp,
  AlertCircle,
  Eye,
  Lock,
  Activity,
  BarChart3,
  Calendar,
  Download
} from 'lucide-react';

interface ComplianceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  status: 'compliant' | 'warning' | 'critical';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface AuditItem {
  id: string;
  timestamp: string;
  action: string;
  component: string;
  status: 'success' | 'warning' | 'error';
  user: string;
  details: string;
}

interface RegulatoryFramework {
  id: string;
  name: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  coverage: number;
  lastAssessment: string;
  requirements: number;
  compliantRequirements: number;
}

export default function ComplianceDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in real implementation, this would come from your CIAF API
  const complianceMetrics: ComplianceMetric[] = [
    {
      id: 'data-integrity',
      name: 'Data Integrity Score',
      value: 98.7,
      target: 95.0,
      status: 'compliant',
      lastUpdated: '2025-08-04T10:30:00Z',
      trend: 'up'
    },
    {
      id: 'model-transparency',
      name: 'Model Transparency',
      value: 87.3,
      target: 90.0,
      status: 'warning',
      lastUpdated: '2025-08-04T09:15:00Z',
      trend: 'stable'
    },
    {
      id: 'audit-coverage',
      name: 'Audit Trail Coverage',
      value: 99.2,
      target: 98.0,
      status: 'compliant',
      lastUpdated: '2025-08-04T11:00:00Z',
      trend: 'up'
    },
    {
      id: 'encryption-compliance',
      name: 'Encryption Compliance',
      value: 100.0,
      target: 100.0,
      status: 'compliant',
      lastUpdated: '2025-08-04T10:45:00Z',
      trend: 'stable'
    }
  ];

  const regulatoryFrameworks: RegulatoryFramework[] = [
    {
      id: 'gdpr',
      name: 'GDPR',
      status: 'compliant',
      coverage: 96.8,
      lastAssessment: '2025-07-28',
      requirements: 31,
      compliantRequirements: 30
    },
    {
      id: 'ai-act',
      name: 'EU AI Act',
      status: 'partial',
      coverage: 78.4,
      lastAssessment: '2025-08-01',
      requirements: 45,
      compliantRequirements: 35
    },
    {
      id: 'sox',
      name: 'SOX',
      status: 'compliant',
      coverage: 100.0,
      lastAssessment: '2025-07-30',
      requirements: 12,
      compliantRequirements: 12
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001',
      status: 'compliant',
      coverage: 92.1,
      lastAssessment: '2025-07-25',
      requirements: 114,
      compliantRequirements: 105
    }
  ];

  const recentAuditItems: AuditItem[] = [
    {
      id: '1',
      timestamp: '2025-08-04T11:23:15Z',
      action: 'Model Inference',
      component: 'Risk Assessment Model v2.1',
      status: 'success',
      user: 'system',
      details: 'Uncertainty receipt generated successfully'
    },
    {
      id: '2',
      timestamp: '2025-08-04T11:18:42Z',
      action: 'Data Access',
      component: 'Customer Dataset',
      status: 'success',
      user: 'jane.doe@company.com',
      details: 'Provenance capsule verified'
    },
    {
      id: '3',
      timestamp: '2025-08-04T11:15:33Z',
      action: 'Model Training',
      component: 'Fraud Detection Model',
      status: 'warning',
      user: 'ml-engineer@company.com',
      details: 'Training completed with 2 validation warnings'
    },
    {
      id: '4',
      timestamp: '2025-08-04T11:10:18Z',
      action: 'Compliance Check',
      component: 'Data Pipeline',
      status: 'success',
      user: 'system',
      details: 'All GDPR requirements validated'
    },
    {
      id: '5',
      timestamp: '2025-08-04T11:05:27Z',
      action: 'Model Creation',
      component: 'Fraud Detection Model v3.2',
      status: 'success',
      user: 'ml-engineer@company.com',
      details: 'Model anchor key generated at creation'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
      case 'error':
      case 'non-compliant':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'partial':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'critical':
      case 'non-compliant':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const overallComplianceScore = Math.round(
    complianceMetrics.reduce((sum, metric) => sum + metric.value, 0) / complianceMetrics.length
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Compliance Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of AI system compliance and regulatory adherence
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <Activity className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Status Alert */}
      <Alert className="mb-6">
        <Shield className="h-4 w-4" />
        <AlertTitle>System Status: {overallComplianceScore >= 95 ? 'Compliant' : overallComplianceScore >= 85 ? 'Monitoring' : 'Action Required'}</AlertTitle>
        <AlertDescription>
          Overall compliance score: <strong>{overallComplianceScore}%</strong>
          {overallComplianceScore >= 95 
            ? ' - All systems operating within compliance parameters.'
            : overallComplianceScore >= 85 
            ? ' - Some metrics require attention but remain within acceptable ranges.'
            : ' - Immediate action required to address compliance gaps.'
          }
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  {getStatusIcon(metric.status)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}%</div>
                  <Progress value={metric.value} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Target: {metric.target}% | Updated: {formatTimestamp(metric.lastUpdated)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CIAF Component Status */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Provenance Capsules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Capsules</span>
                    <Badge variant="secondary">2,847</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Verified Today</span>
                    <Badge variant="secondary">156</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Integrity Score</span>
                    <Badge className="bg-green-100 text-green-800">99.8%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-orange-500" />
                  Uncertainty Receipts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Generated Today</span>
                    <Badge variant="secondary">324</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Validated</span>
                    <Badge variant="secondary">321</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy Rate</span>
                    <Badge className="bg-green-100 text-green-800">99.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Regulatory Tab */}
        <TabsContent value="regulatory" className="space-y-6">
          <div className="grid gap-4">
            {regulatoryFrameworks.map((framework) => (
              <Card key={framework.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(framework.status)}
                        {framework.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last assessed: {framework.lastAssessment}
                      </p>
                    </div>
                    <Badge className={getStatusColor(framework.status)}>
                      {framework.status.charAt(0).toUpperCase() + framework.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Coverage</span>
                        <span>{framework.coverage}%</span>
                      </div>
                      <Progress value={framework.coverage} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Requirements Met</span>
                      <span>{framework.compliantRequirements} / {framework.requirements}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">
                Comprehensive audit trail of all CIAF system interactions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAuditItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                    <div className="mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.component}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</p>
                          <p className="text-xs text-muted-foreground">{item.user}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Monthly Compliance Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Assessment Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Transparency Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Risk Assessment Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Scheduled Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Audit Summary</span>
                    <Badge variant="secondary">Next: Aug 11</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Compliance</span>
                    <Badge variant="secondary">Next: Sep 1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quarterly Risk Review</span>
                    <Badge variant="secondary">Next: Oct 1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Annual Security Assessment</span>
                    <Badge variant="secondary">Next: Jan 15, 2026</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
