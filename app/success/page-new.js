'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [email, setEmail] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Please select a PDF file' })
      e.target.value = ''
      return
    }
    
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 10MB' })
      e.target.value = ''
      return
    }
    
    setFile(selectedFile)
    setMessage({ type: '', text: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !file) {
      setMessage({ type: 'error', text: 'Please provide both email and file' })
      return
    }
    
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('email', email)
      formData.append('session_id', sessionId || '')
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Upload successful! Your action plan will arrive in your email within seconds.' 
        })
        setEmail('')
        setFile(null)
        e.target.reset()
      } else {
        setMessage({ 
          type: 'error', 
          text: data.mes