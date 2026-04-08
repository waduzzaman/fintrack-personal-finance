import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In - FinTrack",
  description: "Sign in to your FinTrack account to manage your personal finances, track expenses, and achieve your financial goals.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
