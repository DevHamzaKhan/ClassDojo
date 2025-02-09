'use server'

import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createClassroom(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Authentication required')

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', user.id)
    .single()

  if (profile?.user_type !== 'teacher') {
    throw new Error('Only teachers can create classrooms')
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  const { data: classroom, error } = await supabase
    .from('classrooms')
    .insert([{
      name: formData.get('name') as string,
      school_id: formData.get('school_id') as string,
      code
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating classroom:', error)
    throw new Error(error.message)
  }

  await supabase
    .from('classroom_users')
    .insert([{
      user_id: user.id,
      classroom_id: classroom.id,
      role: 'teacher'
    }])

  revalidatePath('/classrooms')
  return classroom
}