// src/app/classrooms/create/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SchoolSelect from '@/components/SchoolSelect'
import { createClassroom } from '@/actions/createclassrooms'
import { useRouter } from 'next/navigation'

export default function CreateClassroom() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    try {
      const classroom = await createClassroom(formData)
      router.push(`/classrooms/${classroom.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Classroom</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Class Name</Label>
          <Input name="name" required />
        </div>
        <div>
          <Label htmlFor="school_id">School</Label>
          <SchoolSelect />
        </div>
        <Button type="submit">Create Classroom</Button>
      </form>
    </div>
  )
}