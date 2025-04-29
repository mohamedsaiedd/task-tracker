import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Smart Habit Tracker</h1>
      <p className="text-lg mb-8">Track and build your daily habits.</p>
      <div>
        <Link href="/dashboard"> Dashboard </Link>
        <Link href="/auth/login"> Login </Link>
      </div>
      
    </div>
  );
}