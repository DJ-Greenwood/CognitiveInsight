import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withCIAFBridge } from '@/lib/ciaf-bridge';

// Request/Response schemas
const CreateDatasetAnchorSchema = z.object({
  dataset_id: z.string(),
  metadata: z.record(z.any()),
  use_bridge: z.boolean().default(false), // Toggle between mock and real bridge
});

interface CIAFService {
  createDatasetAnchor(params: {
    dataset_id: string;
    metadata: any;
    master_password?: string;
    salt?: string;
  }): Promise<any>;
}

// Mock CIAF service implementation
// In production, this would connect to the Python CIAF framework
class MockCIAFService implements CIAFService {
  private datasets: Map<string, any> = new Map();

  async createDatasetAnchor(params: {
    dataset_id: string;
    metadata: any;
    master_password?: string;
    salt?: string;
  }) {
    // Simulate cryptographic operations
    const fingerprint = this.generateFingerprint(params.dataset_id, params.metadata);
    const merkleRoot = this.generateMerkleRoot(params.dataset_id);
    
    const anchor = {
      dataset_id: params.dataset_id,
      dataset_fingerprint: fingerprint,
      merkle_root: merkleRoot,
      created_at: new Date().toISOString(),
      metadata: params.metadata,
    };
    
    this.datasets.set(params.dataset_id, anchor);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return anchor;
  }

  private generateFingerprint(datasetId: string, metadata: any): string {
    // Mock fingerprint generation
    const data = JSON.stringify({ datasetId, metadata });
    return `fp_${Buffer.from(data).toString('base64').slice(0, 16)}`;
  }

  private generateMerkleRoot(datasetId: string): string {
    // Mock Merkle root generation
    return `mr_${Buffer.from(datasetId).toString('base64').slice(0, 16)}`;
  }

  async getDatasetAnchor(datasetId: string) {
    return this.datasets.get(datasetId);
  }

  async listDatasets() {
    return Array.from(this.datasets.values());
  }
}

// Global service instance
const ciafService = new MockCIAFService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = CreateDatasetAnchorSchema.parse(body);
    
    // Create dataset anchor
    let result;
    
    if (validatedData.use_bridge) {
      // Use real CIAF framework via Python bridge
      try {
        result = await withCIAFBridge(async (bridge) => {
          const response = await bridge.createDatasetAnchor({
            dataset_id: validatedData.dataset_id,
            metadata: validatedData.metadata,
          });
          
          if (!response.success) {
            throw new Error(response.error || 'Bridge operation failed');
          }
          
          return {
            success: true,
            dataset_anchor: response,
            message: `Dataset anchor created successfully for ${validatedData.dataset_id} using CIAF bridge`,
          };
        });
      } catch (bridgeError) {
        console.error('Bridge error, falling back to mock:', bridgeError);
        
        // Fall back to mock service if bridge fails
        const anchor = await ciafService.createDatasetAnchor({
          dataset_id: validatedData.dataset_id,
          metadata: validatedData.metadata,
        });
        
        result = {
          success: true,
          dataset_anchor: anchor,
          message: `Dataset anchor created using fallback mock service (bridge failed: ${bridgeError instanceof Error ? bridgeError.message : 'Unknown error'})`,
          fallback_mode: true,
        };
      }
    } else {
      // Use mock service
      const anchor = await ciafService.createDatasetAnchor({
        dataset_id: validatedData.dataset_id,
        metadata: validatedData.metadata,
      });
      
      result = {
        success: true,
        dataset_anchor: anchor,
        message: `Dataset anchor created successfully for ${validatedData.dataset_id} using mock service`,
        mock_mode: true,
      };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error creating dataset anchor:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error', 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datasetId = searchParams.get('dataset_id');

    if (datasetId) {
      // Get specific dataset anchor
      const anchor = await ciafService.getDatasetAnchor(datasetId);
      
      if (!anchor) {
        return NextResponse.json(
          { success: false, error: 'Dataset anchor not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        dataset_anchor: anchor,
      });
    } else {
      // List all dataset anchors
      const datasets = await ciafService.listDatasets();
      
      return NextResponse.json({
        success: true,
        datasets,
        count: datasets.length,
      });
    }

  } catch (error) {
    console.error('Error retrieving dataset anchor:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
