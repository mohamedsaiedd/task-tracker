// app/login-redirect/page.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";

export default function LoginRedirectPage() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {error ? (
        <p>Error logging in: {error.message}</p>
      ) : (
        <p>Logging in...</p>
      )}
    </div>
  );
}
