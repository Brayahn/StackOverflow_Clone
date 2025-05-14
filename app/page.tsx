import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-light-500 font-space-grotesk">
        Welcome to Dev Overflow
      </h1>
      <h1 className="h1-bold font-inter text-3xl text-light-500">HomePage</h1>
      <Link href={"/sign-in"}> Sign IN</Link>
    </>
  );
}
