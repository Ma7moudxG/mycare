import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  
  const isAdmin = searchParams.admin === 'true';
  

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
              src="/assets/icons/logo.full.white.large.png"
              height={1000}
              width={1000}
              alt="logo"
              className='mb-12 h-10 w-fit'
          />

          <Image 
              src="/assets/icons/present-orig-logo-w.png"
              height={8000}
              width={8000}
              alt="present logo"
              className='mb-12 h-32 w-fit'
          />

          <LoginForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Digital Factory
            </p>
            {/* <Link href="/?admin=true" className="text-blue-500">
              Admin
            </Link> */}
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
