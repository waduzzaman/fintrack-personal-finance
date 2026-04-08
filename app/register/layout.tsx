import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign Up - FinTrack",
  description: "Create your FinTrack account to start managing your personal finances, track expenses, and achieve your financial goals.",
};

export default function RegisterLayout({
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
