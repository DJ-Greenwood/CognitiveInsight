"""
Cognitive Insight AI Framework (CIAF) - Public API

A framework for creating verifiable AI training and inference pipelines
with proprietary cryptographic audit capabilities.

PATENT NOTICE:
This system is patent pending under U.S. Non-Provisional Application titled
"Method and System for Lazy Capsule Materialization in Cryptographic Audit Trails 
for Artificial Intelligence Systems". Proprietary implementation details, including 
cryptographic key management, audit capsule structure, and metadata architecture, 
are confidential and not disclosed.

For licensing inquiries, contact: patents@cognitiveinsight.ai
"""

# Public API - High-level interfaces only
from .api import CIAFFramework

__version__ = "1.0.0"
__all__ = [
    "CIAFFramework"
]
