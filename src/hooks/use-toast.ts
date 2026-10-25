"use client"

import { toast as globalToast } from "@/components/ui/toast"

export function useToast() {
  function toast(options: {
    title?: string
    description?: string
    type?: "success" | "error" | "warning" | "info"
  }) {
    globalToast.add(options as Parameters<typeof globalToast.add>[0])
  }

  return { toast }
}
