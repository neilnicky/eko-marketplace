import { User } from "@/types/user";
import Image from "next/image";

interface DashboardGreetingProps {
  user: User | null;
}
export function DashboardGreeting({ user }: DashboardGreetingProps) {
  if (user) {
    return (
      <header className="my-8">
        <h1 className="text-3xl md:text-4xl font-bold ">
          Hello, {user.full_name}!
        </h1>
      </header>
    );
  }

  return (
    <header className="mb-8 text-center">
      <div className="mb-6">
        <Image
          src="/assets/ekomart_logo.png"
          alt="Ekonavi Logo"
          width={80}
          height={80}
          className="mx-auto mb-4 rounded-lg"
          priority
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
          Welcome to Ekonavi
        </h1>
        <p className="text-lg text-muted-foreground">
          Your Bioeconomy Platform
        </p>
      </div>
    </header>
  );
}
