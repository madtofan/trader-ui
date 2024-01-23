import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Link href="/dashboard">
        Dashboard
      </Link>
    </main>
  )
}
