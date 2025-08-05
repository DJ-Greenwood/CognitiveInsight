import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import path from 'path';

interface CIAFRequest {
  operation: string;
  params: Record<string, any>;
}

interface CIAFResponse {
  success: boolean;
  error?: string;
  [key: string]: any;
}

export class CIAFBridge extends EventEmitter {
  private pythonProcess: ChildProcess | null = null;
  private isConnected = false;
  private requestQueue: Array<{
    request: CIAFRequest;
    resolve: (value: CIAFResponse) => void;
    reject: (error: Error) => void;
  }> = [];

  constructor() {
    super();
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      const bridgeScriptPath = path.join(process.cwd(), 'ciaf_bridge.py');
      
      this.pythonProcess = spawn('python', [bridgeScriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      this.pythonProcess.stdout?.on('data', (data) => {
        this.handlePythonResponse(data.toString());
      });

      this.pythonProcess.stderr?.on('data', (data) => {
        console.error('Python bridge error:', data.toString());
      });

      this.pythonProcess.on('close', (code) => {
        console.log(`Python bridge process exited with code ${code}`);
        this.isConnected = false;
        this.emit('disconnected');
      });

      this.pythonProcess.on('error', (error) => {
        console.error('Python bridge process error:', error);
        this.emit('error', error);
      });

      this.isConnected = true;
      this.emit('connected');

    } catch (error) {
      console.error('Failed to start Python bridge:', error);
      throw error;
    }
  }

  private handlePythonResponse(data: string) {
    try {
      const lines = data.trim().split('\n');
      
      for (const line of lines) {
        if (line.trim()) {
          const response: CIAFResponse = JSON.parse(line);
          
          // Process the next request in queue
          const queueItem = this.requestQueue.shift();
          if (queueItem) {
            if (response.success) {
              queueItem.resolve(response);
            } else {
              queueItem.reject(new Error(response.error || 'Unknown error'));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error parsing Python response:', error);
    }
  }

  async sendRequest(operation: string, params: Record<string, any>): Promise<CIAFResponse> {
    if (!this.isConnected || !this.pythonProcess) {
      throw new Error('Python bridge is not connected');
    }

    return new Promise((resolve, reject) => {
      const request: CIAFRequest = { operation, params };
      
      this.requestQueue.push({ request, resolve, reject });
      
      const requestString = JSON.stringify(request) + '\n';
      this.pythonProcess?.stdin?.write(requestString);
    });
  }

  async createDatasetAnchor(params: {
    dataset_id: string;
    metadata: Record<string, any>;
  }): Promise<CIAFResponse> {
    return this.sendRequest('create_dataset_anchor', params);
  }

  async createProvenanceCapsules(params: {
    dataset_id: string;
    data_items: Array<{
      id: string;
      content: string;
      metadata: Record<string, any>;
    }>;
  }): Promise<CIAFResponse> {
    return this.sendRequest('create_provenance_capsules', params);
  }

  async createInferenceReceipt(params: {
    model_id: string;
    input_data: Record<string, any>;
    output_prediction: Record<string, any>;
    confidence_score: number;
    metadata?: Record<string, any>;
  }): Promise<CIAFResponse> {
    return this.sendRequest('create_inference_receipt', params);
  }

  async verifyItem(params: {
    item_id: string;
    item_type: 'dataset_anchor' | 'provenance_capsule' | 'inference_receipt';
    verification_data?: Record<string, any>;
  }): Promise<CIAFResponse> {
    return this.sendRequest('verify_item', params);
  }

  async generateReport(params: {
    report_type: 'compliance' | 'audit' | 'transparency' | 'risk_assessment';
    filters?: {
      date_range?: { start: string; end: string };
      dataset_ids?: string[];
      model_ids?: string[];
      compliance_threshold?: number;
    };
  }): Promise<CIAFResponse> {
    return this.sendRequest('generate_report', params);
  }

  disconnect(): void {
    if (this.pythonProcess) {
      this.pythonProcess.kill();
      this.pythonProcess = null;
    }
    this.isConnected = false;
  }
}

// Singleton instance
let bridgeInstance: CIAFBridge | null = null;

export function getCIAFBridge(): CIAFBridge {
  if (!bridgeInstance) {
    bridgeInstance = new CIAFBridge();
  }
  return bridgeInstance;
}

// Utility function for API routes
export async function withCIAFBridge<T>(
  operation: (bridge: CIAFBridge) => Promise<T>
): Promise<T> {
  const bridge = getCIAFBridge();
  
  if (!bridge['isConnected']) {
    await bridge.connect();
  }
  
  return operation(bridge);
}
