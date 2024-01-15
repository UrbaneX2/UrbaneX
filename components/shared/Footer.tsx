import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="/assets/images/logo.jpeg"
            alt="logo"
            width={58}
            height={38}
          />
        </Link>

        <p className="text-white">2023 UrbaneX. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer