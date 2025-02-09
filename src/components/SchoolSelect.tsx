// src/components/SchoolSelect.tsx
'use client'

import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '../../utils/supabase/client'

export default function SchoolSelect() {
  const [schools, setSchools] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchSchools = async () => {
      const { data } = await supabase.from('schools').select('*')
      setSchools(data || [])
    }
    fetchSchools()
  }, [])

  return (
    <Select name="school_id" required>
      <SelectTrigger>
        <SelectValue placeholder="Select school" />
      </SelectTrigger>
      <SelectContent>
        {schools.map(school => (
          <SelectItem key={school.id} value={school.id}>
            {school.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}