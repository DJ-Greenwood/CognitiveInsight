import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const CreateInferenceReceiptSchema = z.object({
  model_id: z.string(),
  input_data: z.record(z.any()),
  output_prediction: z.record(z.any()),
  confidence_score: z.number().min(0).max(1),
  metadata: z.record(z.any()).optional(),
});

class MockInferenceService {
  private receipts: Map<string, any> = new Map();

  async createInferenceReceipt(params: {
    model_id: string;
    input_data: Record<string, any>;
    output_prediction: Record<string, any>;
    confidence_score: number;
    metadata?: Record<string, any>;
  }) {
    const receipt = {
      receipt_id: `receipt_${this.generateId()}`,
      model_id: params.model_id,
      input_hash: this.generateHash(JSON.stringify(params.input_data)),
      output_hash: this.generateHash(JSON.stringify(params.output_prediction)),
      confidence_score: params.confidence_score,
      timestamp: new Date().toISOString(),
      cryptographic_proof: this.generateProof(),
      metadata: params.metadata || {},
      verification_status: 'verified',
    };
    
    this.receipts.set(receipt.receipt_id, receipt);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return receipt;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private generateHash(content: string): string {
    return `hash_${Buffer.from(content).toString('base64').slice(0, 20)}`;
  }

  private generateProof(): string {
    return `proof_${Math.random().toString(36).substring(2, 25)}`;
  }

  async getReceipt(receiptId: string) {
    return this.receipts.get(receiptId);
  }

  async getAllReceipts() {
    return Array.from(this.receipts.values());
  }

  async verifyReceipt(receiptId: string) {
    const receipt = this.receipts.get(receiptId);
    if (!receipt) {
      throw new Error('Receipt not found');
    }

    // Mock verification process
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      receipt_id: receiptId,
      is_valid: true,
      verification_timestamp: new Date().toISOString(),
      integrity_check: 'passed',
      cryptographic_verification: 'valid',
    };
  }
}

const inferenceService = new MockInferenceService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = CreateInferenceReceiptSchema.parse(body);
    
    // Create inference receipt
    const receipt = await inferenceService.createInferenceReceipt({
      model_id: validatedData.model_id,
      input_data: validatedData.input_data,
      output_prediction: validatedData.output_prediction,
      confidence_score: validatedData.confidence_score,
      metadata: validatedData.metadata,
    });

    return NextResponse.json({
      success: true,
      receipt,
    });

  } catch (error) {
    console.error('Error creating inference receipt:', error);
    
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
    const receiptId = searchParams.get('receipt_id');

    if (receiptId) {
      // Get specific receipt
      const receipt = await inferenceService.getReceipt(receiptId);
      
      if (!receipt) {
        return NextResponse.json(
          { success: false, error: 'Receipt not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        receipt,
      });
    } else {
      // Get all receipts
      const receipts = await inferenceService.getAllReceipts();
      
      return NextResponse.json({
        success: true,
        receipts,
        count: receipts.length,
      });
    }

  } catch (error) {
    console.error('Error retrieving inference receipts:', error);
    
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
