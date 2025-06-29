import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  session && redirect("/dashboard");

  return (
    <main className="h-[100vh]">
      <LoginForm />
    </main>
  );
}
