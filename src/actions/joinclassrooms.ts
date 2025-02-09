'use server'

import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function joinClassroom(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Authentication required')

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', user.id)
    .single()

  if (profile?.user_type !== 'student') {
    throw new Error('Only students can join classrooms')
  }

  const code = formData.get('code') as string

  const { data: classroom, error: classroomError } = await supabase
    .from('classrooms')
    .select('id')
    .eq('code', code)
    .single()

  if (classroomError || !classroom) {
    throw new Error('Invalid classroom code')
  }

  const { count } = await supabase
    .from('classroom_users')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .eq('classroom_id', classroom.id)

  if (count && count > 0) {
    throw new Error('You already joined this classroom')
  }

  const { error } = await supabase
    .from('classroom_users')
    .insert([{
      user_id: user.id,
      classroom_id: classroom.id,
      role: 'student'
    }])

  if (error) {
    console.error('Error joining classroom:', error)
    throw new Error(error.message)
  }

  revalidatePath('/classrooms')
  return classroom
}