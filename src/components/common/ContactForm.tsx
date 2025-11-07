import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from './Button';

interface FormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  _gotcha?: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // For now, just simulate form submission
    // In production, replace with actual form endpoint (Formspree, Web3Forms, etc.)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          {...register('company')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: 'Message is required' })}
          placeholder="Tell me about your product and what challenges you're facing..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot (anti-spam) */}
      <input
        type="text"
        {...register('_gotcha')}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thank you! Your message has been sent successfully. I'll respond within 24 hours.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Sorry, there was an error sending your message. Please try again or email me directly at sales@summerlynadvisors.com
        </div>
      )}

      <p className="text-sm text-gray-500 text-center">
        Your information is confidential and never shared.
      </p>
    </form>
  );
}
