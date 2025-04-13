import { SignupForm } from "@/components/signup-form";
import { redirectIfAuthenticated } from "@/lib/getUserData";

export default async function Page() {
  await redirectIfAuthenticated();

  return (
    <div className="flex flex-col gap-4 min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-[#1c1c87] to-[#0c0c38]">
      <h1 className="text-white font-bold text-5xl">
        Pixl<span className="text-[#b45252]">Hub</span>
      </h1>
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
