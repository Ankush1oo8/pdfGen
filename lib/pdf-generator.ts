import jsPDF from "jspdf"
import type { FormData } from "@/contexts/form-data-context"

export function generatePDF(formData: FormData) {
  const doc = new jsPDF()

  // Set up the document
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  let yPosition = 30

  // Title
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("Professional Profile", pageWidth / 2, yPosition, { align: "center" })

  yPosition += 20

  // Add a line separator
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 15

  // Personal Information Section
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("Personal Information", margin, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")

  // Name
  if (formData.name) {
    doc.setFont("helvetica", "bold")
    doc.text("Name:", margin, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.name, margin + 25, yPosition)
    yPosition += 8
  }

  // Email
  if (formData.email) {
    doc.setFont("helvetica", "bold")
    doc.text("Email:", margin, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.email, margin + 25, yPosition)
    yPosition += 8
  }

  // Phone
  if (formData.phone) {
    doc.setFont("helvetica", "bold")
    doc.text("Phone:", margin, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.phone, margin + 25, yPosition)
    yPosition += 8
  }

  // Position
  if (formData.position) {
    doc.setFont("helvetica", "bold")
    doc.text("Position:", margin, yPosition)
    doc.setFont("helvetica", "normal")
    doc.text(formData.position, margin + 25, yPosition)
    yPosition += 8
  }

  // Description Section
  if (formData.description) {
    yPosition += 10

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Description", margin, yPosition)
    yPosition += 10

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")

    // Split description into lines that fit the page width
    const maxWidth = pageWidth - margin * 2
    const lines = doc.splitTextToSize(formData.description, maxWidth)

    lines.forEach((line: string) => {
      if (yPosition > 270) {
        // Check if we need a new page
        doc.addPage()
        yPosition = 30
      }
      doc.text(line, margin, yPosition)
      yPosition += 6
    })
  }

  // Footer
  yPosition += 20
  if (yPosition > 270) {
    doc.addPage()
    yPosition = 30
  }

  doc.setFontSize(10)
  doc.setFont("helvetica", "italic")
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.text(`Generated on ${currentDate}`, pageWidth / 2, yPosition, { align: "center" })

  // Save the PDF
  const fileName = formData.name ? `${formData.name.replace(/\s+/g, "_")}_Profile.pdf` : "Profile.pdf"
  doc.save(fileName)
}
