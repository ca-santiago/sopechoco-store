import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Link href="/store">
          Visit store
        </Link>
      </div>
    </div>
  );
}
