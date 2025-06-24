import { User } from "@/types/user";

interface DashboardGreetingProps {
  user: User | null;
}
export function DashboardGreeting({ user }: DashboardGreetingProps) {
  return (
    <header className="my-8">
      <h1 className="text-3xl md:text-4xl font-bold ">
        Hello, {user?.full_name}!
      </h1>
    </header>
  );
}
