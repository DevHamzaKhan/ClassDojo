'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { joinClassroom } from '@/actions/joinclassrooms'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JoinClassroom() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    try {
      const result = await joinClassroom(formData)
      router.push(`/classrooms/${result.id}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Join Classroom</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="code">Classroom Code</Label>
          <Input 
            name="code" 
            required 
            placeholder="Enter class code"
            className="uppercase"
            pattern="[A-Z0-9]{6}"
            title="6-character classroom code"
            onChange={(e) => e.target.value = e.target.value.toUpperCase()}
          />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full">
          Join Classroom
        </Button>
      </form>
    </div>
  )
}