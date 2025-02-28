import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="bg-sky-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center gap-4">
        <div className="w-auto h-auto">
            <Image
              src="/squareshift2.png"
              alt="SquareShift"
              width={140}  // Adjust width for better alignment
              height={45}  // Adjust height for proper scaling
              className="object-contain"
            />
          </div>
          <div className="w-auto h-auto">
            <Image
              src="/elastic.png"
              alt="Elastic"
              width={100}  // Adjust width for better alignment
              height={30}  // Adjust height for proper scaling
              className="object-contain"
            />
          </div>
          <div className="w-auto h-auto">
            <Image
              src="/aws.png"
              alt="AWS"
              width={70}  // Adjust width for better alignment
              height={17}  // Adjust height for proper scaling
              className="object-contain"
            />
          </div>
          </div>
        <div className="ml-auto flex items-center gap-6">
          <Link href="/" className="text-vibrant-blue font-medium hover:text-vibrant-purple transition-colors">
            Upload
          </Link>
          <Link href="/dashboard" className="text-vibrant-blue font-medium hover:text-vibrant-purple transition-colors">
            Dashboard
          </Link>
          <h2 className="text-xl font-bold">
            <span className="text-blue-500">ShiftHealth</span>
            <span className="text-red-500">+</span>
          </h2>
        </div>
      </div>
    </header>
  )
}

