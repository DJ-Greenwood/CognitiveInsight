"""
Command Line Interface for Lazy Capsule Audit

Provides CLI tools for patent implementation testing and demonstration.
"""

import argparse
import json
import sys
from typing import List, Any, Dict

from .audit_trail import AuditTrailManager
from .capsule import LazyCapsuler
from . import get_patent_info


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Lazy Capsule Materialization CLI - Patent Implementation",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  lazy-audit demo --samples 100                 # Run demo with 100 samples
  lazy-audit patent-info                        # Show patent information
  lazy-audit benchmark --dataset test-data      # Run performance benchmark
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Demo command
    demo_parser = subparsers.add_parser('demo', help='Run demonstration')
    demo_parser.add_argument('--samples', type=int, default=50, 
                           help='Number of samples to use in demo')
    demo_parser.add_argument('--audit-type', choices=['full', 'selective', 'sample'], 
                           default='selective', help='Type of audit to perform')
    demo_parser.add_argument('--passphrase', default='demo-passphrase-2024',
                           help='Master passphrase for key derivation')
    
    # Patent info command  
    patent_parser = subparsers.add_parser('patent-info', help='Show patent information')
    
    # Benchmark command
    benchmark_parser = subparsers.add_parser('benchmark', help='Run performance benchmarks')
    benchmark_parser.add_argument('--dataset', default='benchmark-dataset',
                                help='Dataset identifier for benchmarking')
    benchmark_parser.add_argument('--samples', type=int, default=1000,
                                help='Number of samples for benchmark')
    
    args = parser.parse_args()
    
    if args.command == 'demo':
        run_demo(args.samples, args.audit_type, args.passphrase)
    elif args.command == 'patent-info':
        show_patent_info()
    elif args.command == 'benchmark':
        run_benchmark(args.dataset, args.samples)
    else:
        parser.print_help()


def run_demo(num_samples: int, audit_type: str, passphrase: str):
    """Run demonstration of lazy capsule materialization."""
    print("🚀 Lazy Capsule Materialization Demo")
    print("=" * 60)
    print(f"Patent: Method and System for Lazy Capsule Materialization")
    print(f"Inventor: Denzil James Greenwood")
    print(f"Samples: {num_samples}, Audit Type: {audit_type}")
    print("-" * 60)
    
    try:
        # Initialize audit trail manager
        manager = AuditTrailManager(passphrase)
        
        # Create dataset audit trail
        dataset_id = "demo_ai_dataset"
        capsuler = manager.create_dataset_audit_trail(dataset_id, "demo_model_v1.0")
        
        print(f"\n📊 Adding {num_samples} samples (lazy storage)...")
        
        # Add sample training data (lazy - no encryption yet)
        training_samples = []
        for i in range(num_samples):
            sample_data = {
                "sample_id": i,
                "features": [f"feature_{j}" for j in range(5)],
                "value": i * 2.5,
                "category": f"class_{i % 3}",
                "metadata": f"sample metadata for {i}"
            }
            training_samples.append((i, sample_data))
        
        manager.add_training_samples(dataset_id, training_samples, "demo_model_v1.0")
        
        print(f"✅ Added {num_samples} samples with lazy materialization")
        print(f"   Memory efficiency: No encryption performed yet!")
        
        # Simulate audit request (triggers lazy materialization)
        print(f"\n🔍 Performing {audit_type} audit (triggers materialization)...")
        
        if audit_type == "selective":
            # Audit first 10% of samples
            audit_samples = min(max(1, num_samples // 10), 10)
            sample_ids = list(range(audit_samples))
        elif audit_type == "sample":
            # Audit just 3 samples
            sample_ids = [0, num_samples//2, num_samples-1] if num_samples > 1 else [0]
        else:
            # Full audit (limited for demo)
            sample_ids = list(range(min(num_samples, 20)))
        
        print(f"   Materializing capsules for {len(sample_ids)} samples...")
        
        # Generate audit package (lazy materialization happens here)
        audit_package = manager.generate_compliance_audit(
            dataset_id=dataset_id,
            audit_type=audit_type,
            sample_ids=sample_ids,
            regulatory_framework="Demo Framework"
        )
        
        print(f"✅ Audit completed! Package generated with {len(sample_ids)} capsules")
        
        # Show performance metrics
        if 'performance_metrics' in audit_package:
            metrics = audit_package['performance_metrics']
            print(f"\n📈 Performance Results:")
            print(f"   Speedup Achieved: {metrics.get('speedup_achieved', 'N/A'):.1f}×")
            print(f"   Memory Efficiency: {capsuler._calculate_memory_efficiency():.1f}%")
            print(f"   Materialized: {metrics.get('capsules_materialized', 0)} of {metrics.get('samples_added', 0)} samples")
            print(f"   Cache Hits: {metrics.get('cache_hits', 0)}")
            
            # Check patent targets
            targets_met = metrics.get('patent_targets_met', False)
            print(f"   Patent Targets Met: {'✅ YES' if targets_met else '❌ NO'}")
        
        # Verify audit package
        print(f"\n🔒 Verifying audit package integrity...")
        verification = manager.verify_audit_integrity(audit_package)
        
        overall_valid = verification.get('overall_valid', False)
        print(f"   Overall Valid: {'✅ YES' if overall_valid else '❌ NO'}")
        print(f"   Merkle Proofs: {'✅ VALID' if verification.get('merkle_proofs_valid', False) else '❌ INVALID'}")
        print(f"   Package Integrity: {'✅ VALID' if verification.get('package_integrity', False) else '❌ INVALID'}")
        
        # Export audit metadata
        print(f"\n💾 Exporting audit metadata...")
        metadata_json = manager.export_audit_metadata(dataset_id, "json")
        print(f"   Metadata exported for compliance reporting")
        
        # Show global performance report
        print(f"\n📋 Global Performance Report:")
        global_report = manager.get_global_performance_report()
        performance = global_report['performance_summary']
        
        print(f"   Average Speedup: {performance['average_speedup']}")
        print(f"   Average Memory Efficiency: {performance['average_memory_efficiency']}")
        
        targets = performance['patent_targets']
        print(f"   Speedup Target (1,000×): {'✅ MET' if targets['speedup_achieved'] else '❌ NOT MET'}")
        print(f"   Memory Target (99%): {'✅ MET' if targets['memory_achieved'] else '❌ NOT MET'}")
        
        print(f"\n🎉 Demo completed successfully!")
        print(f"   Patent innovation demonstrated: Lazy capsule materialization")
        print(f"   Key benefit: Only {len(sample_ids)} of {num_samples} samples encrypted")
        
    except Exception as e:
        print(f"❌ Demo failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


def show_patent_info():
    """Display patent information."""
    patent_info = get_patent_info()
    
    print("📜 USPTO Provisional Patent Application")
    print("=" * 60)
    print(f"Title: {patent_info['title']}")
    print(f"Inventor: {patent_info['inventor']}")
    print(f"Residence: {patent_info['residence']}")
    print(f"Citizenship: {patent_info['citizenship']}")
    print(f"Implementation Version: {patent_info['version']}")
    
    print(f"\n🎯 Patent Claims Implemented:")
    for claim_id, description in patent_info['claims_implemented'].items():
        print(f"   {claim_id}: {description}")
    
    print(f"\n⚡ Performance Targets:")
    for target, value in patent_info['performance_targets'].items():
        print(f"   {target}: {value}")
    
    print(f"\n🏛️ Patent Abstract:")
    print(f"""
A system and method for creating cryptographic audit trails in artificial 
intelligence systems using lazy capsule materialization. The invention defers 
capsule creation until an audit is requested, deriving keys hierarchically via 
PBKDF2-HMAC-SHA256 and HMAC-SHA256, constructing Merkle trees for dataset 
integrity, and encrypting data using AES-256-GCM. Persistent JSON metadata 
stores Merkle proofs, verification results, and audit logs. Intelligent caching 
enables 20–30× acceleration of proof operations while preserving tamper evidence. 
Performance tests demonstrate over 1,000× faster audit preparation and 99% 
memory efficiency, enabling scalable, zero-knowledge regulatory auditability 
for AI systems.
    """)


def run_benchmark(dataset_id: str, num_samples: int):
    """Run performance benchmark."""
    print("⚡ Lazy Capsule Materialization Benchmark")
    print("=" * 60)
    print(f"Dataset: {dataset_id}")
    print(f"Samples: {num_samples}")
    print("-" * 60)
    
    import time
    
    try:
        # Initialize system
        manager = AuditTrailManager("benchmark-passphrase-2024")
        capsuler = manager.create_dataset_audit_trail(dataset_id, "benchmark_model")
        
        # Benchmark 1: Sample Addition (Lazy)
        print(f"\n🏃‍♂️ Benchmark 1: Adding {num_samples} samples (lazy)")
        start_time = time.time()
        
        samples = []
        for i in range(num_samples):
            sample_data = {
                "id": i,
                "data": f"sample_data_{i}",
                "timestamp": time.time(),
                "size": len(str(i))
            }
            samples.append((i, sample_data))
        
        manager.add_training_samples(dataset_id, samples)
        lazy_add_time = time.time() - start_time
        
        print(f"   ✅ Time: {lazy_add_time:.4f}s")
        print(f"   ✅ Rate: {num_samples/lazy_add_time:.0f} samples/sec")
        
        # Benchmark 2: Selective Materialization
        print(f"\n🏃‍♂️ Benchmark 2: Selective audit (10% of samples)")
        audit_count = max(1, num_samples // 10)
        sample_ids = list(range(0, num_samples, num_samples // audit_count))[:audit_count]
        
        start_time = time.time()
        audit_package = manager.generate_compliance_audit(
            dataset_id, "selective", sample_ids
        )
        selective_audit_time = time.time() - start_time
        
        print(f"   ✅ Time: {selective_audit_time:.4f}s")
        print(f"   ✅ Samples Audited: {len(sample_ids)}")
        print(f"   ✅ Rate: {len(sample_ids)/selective_audit_time:.0f} capsules/sec")
        
        # Calculate theoretical speedup vs eager materialization
        estimated_eager_time = lazy_add_time * num_samples / len(sample_ids)
        speedup = estimated_eager_time / (lazy_add_time + selective_audit_time)
        
        print(f"\n📊 Performance Analysis:")
        print(f"   Lazy Storage Time: {lazy_add_time:.4f}s")
        print(f"   Selective Audit Time: {selective_audit_time:.4f}s")
        print(f"   Estimated Eager Time: {estimated_eager_time:.4f}s")
        print(f"   Speedup Achieved: {speedup:.1f}×")
        print(f"   Memory Efficiency: {((num_samples - len(sample_ids))/num_samples)*100:.1f}%")
        
        # Patent target verification
        print(f"\n🎯 Patent Target Verification:")
        print(f"   Target Speedup: 1,000×")
        print(f"   Achieved: {speedup:.1f}× {'✅ MET' if speedup >= 1000 else '❌ NOT MET'}")
        print(f"   Target Memory: 99%")
        memory_eff = ((num_samples - len(sample_ids))/num_samples)*100
        print(f"   Achieved: {memory_eff:.1f}% {'✅ MET' if memory_eff >= 99 else '❌ NOT MET'}")
        
        print(f"\n🎉 Benchmark completed!")
        
    except Exception as e:
        print(f"❌ Benchmark failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
