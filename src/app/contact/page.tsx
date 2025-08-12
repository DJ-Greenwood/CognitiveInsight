'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { handleContactForm, type ContactFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit
    </Button>
  );
}

export default function ContactPage() {
  const initialState: ContactFormState = { message: '', status: 'idle' };
  const [state, formAction] = useActionState(handleContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Message Sent!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Join the Early Access Program</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Be the first to experience Insight™ and shape the future of compliance. We're looking for pilot partners, advisors, and strategic investors.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-lg">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input id="organization" name="organization" placeholder="Your Organization (Optional)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest">I'm interested in</Label>
            <Select name="interest">
              <SelectTrigger>
                <SelectValue placeholder="Select your primary interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early-access">Early Access Program</SelectItem>
                <SelectItem value="pilot-partnership">Pilot Partnership</SelectItem>
                <SelectItem value="funding">Funding & Investment</SelectItem>
                <SelectItem value="advisory">Advisory Role</SelectItem>
                <SelectItem value="strategic-partnership">Strategic Partnership</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Tell us about your interest in Insight™ and how you'd like to collaborate" required />
          </div>
          <SubmitButton />
        </form>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="secondary" asChild>
            <a href="mailto:Insight@CognitiveInsight.ai">Email Us Directly</a>
          </Button>
          <Button variant="outline" disabled>
            White Paper - Patent Pending
          </Button>
        </div>
      </div>
    </div>
  );
}
