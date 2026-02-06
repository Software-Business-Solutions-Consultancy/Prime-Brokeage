"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Search } from "lucide-react"
import { Button } from "./button"
import Browse from '/assets/img/browse.png'

interface FileInputProps {
  onFileChange?: (file: File | null) => void
  accept?: string
  multiple?: boolean
  className?: string
}

export function FileInput({ onFileChange, accept, multiple = false, className = "" }: FileInputProps) {
  const [fileName, setFileName] = useState<string>("No file")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const file = files[0]
      setFileName(file.name)
      onFileChange?.(file)
    } else {
      setFileName("No file")
      onFileChange?.(null)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`flex items-center gap-0 rounded-md border border-input bg-background h-12 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className={`hidden`}
      />

      {/* Browse button */}
      <Button variant="secondary" size="sm" onClick={handleBrowseClick} className="rounded-none rounded-l-md bg-black h-12 !text-white px-8">
        <Search className="size-4" />
        {/* <img src={Browse} alt="" /> */}
        BROWSE
      </Button>

      {/* File name display */}
      <span className="flex-1 px-4 py-2 text-sm text-muted-foreground">{fileName}</span>
    </div>
  )
}
