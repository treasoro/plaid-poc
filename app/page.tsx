'use client'

import { useState, useEffect } from "react";
import { startLink } from "@/utils/plaid";

type User = {
  id: number
  username: string
}

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [allUsers, setAllUsers ] = useState<User[]>([])

  

  const createNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const userName = data.get('username')
    if (userName) {
      await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({
          username: userName,
        }),
      }).then((r) => {
        r.json()
        setSignedIn(true)
      }).catch((error) => {
        console.error(error.code, error.message)
      })
    }
  }

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const userId = data.get('existingUsers')?.valueOf()
    if (userId) {
      await fetch('/api/users/sign_in', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
        }),
      }).then(() => {
        setSignedIn(true)
      }).catch((error) => {
        console.error(error.code, error.message)
      })
    }
  }

  const connectToBank = async () => {
    await startLink(() => {
      console.log("success!")
    })
  }

  useEffect(() => {
    const getAllUsers = async () => {
      await fetch('/api/users/list', {
        method: 'GET',
      }).then((result) => {
        result.json().then((data) => {
          setAllUsers(data)
        })
      }).catch((error) => {
        console.error(error.code, error.message)
      })
    }
    getAllUsers()
  }, [])

  return (
    <div className="">
      <main className="p-8">
       <h1 className="text-2xl font-bold">Plaid POC</h1>
      </main>
      
      <section className="my-4 mx-8">
      <p>Let&apos;s see how you spent your money!</p>
      </section>

      {!signedIn && 
      <>
        <section className="my-4 mx-8">
          <h3 className="font-bold mb-4">Create an account!</h3>
          <form className="w-1/4" onSubmit={createNewUser}>
            <div className="flex flex-col">
              <label htmlFor="username" className="w-full">Account username</label>
              <input placeholder="JoeTest" name="username" id="username" type="text" className="input input-bordered w-full max-w-xs mb-4"/>
            </div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </form>
        </section>

        <section className="my-4 mx-8 mt-8">
          <h3 className="font-bold mb-4">Sign in!</h3>
          <form className="w-1/4" onSubmit={loginUser}>
            <div className="flex flex-col">
              <label htmlFor="username" className="w-full">Select your username</label>
              <select className="select select-bordered w-full max-w-xs mb-4" name="existingUsers">
                {allUsers.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  )
                })}
            </select>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </section>
      </>
      }
      {signedIn && 
      <>
        <section className="my-4 mx-8">
          <h3 className="font-bold mb-4">Welcome back!</h3>
        </section>

        <section className="my-4 mx-8">
          <button className="btn btn-primary" onClick={connectToBank}>Connect my bank!</button>
        </section>
      </>
      }
    </div>
  );
}
