import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string
}

const Login = () => {
  const [login, setLogin] = useState(false)
  const { signIn, signUp, user, error, setError } = useAuth()
  const router = useRouter()

  const callbackUrl = (router.query?.callbackUrl as string) ?? "/"
  useEffect(() => {
    setTimeout(() => { setError(null) }, 3000)
  }, [error])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  if (user) {
    router.push(callbackUrl)
    return <Loader />
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {

      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  };



  return (
    <div className="relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent ">
      <Head>
        <title>Marflix</title>
        <meta name="description" content="Marflix movie app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={"https://i.pinimg.com/564x/38/31/a0/3831a0700d61da9448ee688619062b91.jpg"} fill loading="lazy" alt="" className="-z-10 !hidden opacity-60  sm:!inline object-cover" />
      <Image src={"/assets/logo.png"} height={55} width={84} loading="lazy" alt="" className="absolute left-4 h-auto w-auto top-4 object-contain md:left-10 md:top-6" />


      <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 ">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          {error && <span className="flex p-1 text-md w-full font-light text-orange-500 transition duration-300">{error}</span>}
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="form-input" {...register('email', { required: true })} />
            {errors.email && <span className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email</span>}

          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className="form-input" {...register('password', { required: true })} />
            {errors.password && <span className="p-1 text-[13px] font-light text-orange-500"> {errors && errors.password.message || "Password is required"} </span>}
          </label>
        </div>
        <button type="submit" className="w-full rounded bg-red-600 py-3 font-semibold" onClick={() => setLogin(true)}>
          Sign In
        </button>
        <div className="flex text-[gray]">
          <p>New to Marflix?</p>
          <button className="text-white ml-2 font-semibold hover:underline" onClick={() => setLogin(false)}>Sign up now</button>
        </div>

      </form>
    </div>
  )
}

export default Login