"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface FormData {
  name: string
  email: string
  phone: string
  position: string
  description: string
}

interface FormDataContextType {
  formData: FormData
  setFormData: (data: FormData) => void
  updateFormData: (field: keyof FormData, value: string) => void
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined)

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    description: "",
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("pdfFormData")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("pdfFormData", JSON.stringify(formData))
  }, [formData])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <FormDataContext.Provider value={{ formData, setFormData, updateFormData }}>{children}</FormDataContext.Provider>
  )
}

export function useFormData() {
  const context = useContext(FormDataContext)
  if (context === undefined) {
    throw new Error("useFormData must be used within a FormDataProvider")
  }
  return context
}
