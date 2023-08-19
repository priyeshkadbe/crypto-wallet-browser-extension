"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter();
    const handleLogin = () => {
      // Redirect to the login route
      router.push("/login");
    };

  return( 
    <Link href="/login"> login</Link>
  );
}
