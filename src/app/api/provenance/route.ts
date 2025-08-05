import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateProvenanceCapsuleSchema = z.object({
  dataset_id: z.string(),
  data_items: z.array(z.object({
    id: z.string(),
    content: z.string(),
    metadata: z.record(z.any()),
  })),
});

class MockProvenanceService {
  private capsules: Map<string, any[]> = new Map();

  async createProvenanceCapsules(params: {
    dataset_id: string;
    data_items: Array<{
      id: string;
      content: string;
      metadata: Record<string, any>;
    }>;
  }) {
    const capsules = [];
    
    for (const item of params.data_items) {
      const capsule = {
        capsule_id: `cap_${this.generateId()}`,
        item_id: item.id,
        hash: this.generateHash(item.content),
        encrypted: true,
        created_at: new Date().toISOString(),
        dataset_id: params.dataset_id,
      };
      
      capsules.push(capsule);
    }
    
    // Store capsules
    const existingCapsules = this.capsules.get(params.dataset_id) || [];
    this.capsules.set(params.dataset_id, [...existingCapsules, ...capsules]);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return capsules;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private generateHash(content: string): string {
    // Mock hash generation
    return `hash_${Buffer.from(content).toString('base64').slice(0, 16)}`;
  }

  async getCapsules(datasetId: string) {
    return this.capsules.get(datasetId) || [];
  }
}

const provenanceService = new MockProvenanceService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = CreateProvenanceCapsuleSchema.parse(body);
    
    // Create provenance capsules
    const capsules = await provenanceService.createProvenanceCapsules({
      dataset_id: validatedData.dataset_id,
      data_items: validatedData.data_items,
    });

    return NextResponse.json({
      success: true,
      capsules_created: capsules.length,
      capsules,
    });

  } catch (error) {
    console.error('Error creating provenance capsules:', error);
    
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

    if (!datasetId) {
      return NextResponse.json(
        { success: false, error: 'dataset_id parameter required' },
        { status: 400 }
      );
    }

    const capsules = await provenanceService.getCapsules(datasetId);
    
    return NextResponse.json({
      success: true,
      capsules,
      count: capsules.length,
    });

  } catch (error) {
    console.error('Error retrieving provenance capsules:', error);
    
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
