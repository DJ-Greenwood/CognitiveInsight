import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, FileLock2 } from 'lucide-react';
import Link from 'next/link';

// ... rest of your code remains the same, but replace the Image component:

<Image
  src="/images/data-security-privacy.jpg" // Replace with actual image path
  width={600}
  height={450}
  alt="Illustration of data security and privacy protection with encrypted shields and locks"
  className="rounded-xl shadow-2xl"
/>
