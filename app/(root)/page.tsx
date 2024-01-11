import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <h1 className='text-4xl text-purple-600'>UrbaneX</h1>
      <Button>Test Button</Button>
    </main>
  )
}