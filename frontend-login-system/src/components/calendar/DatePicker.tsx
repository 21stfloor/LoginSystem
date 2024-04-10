"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

interface DatePickerProps {
  disabled?: boolean;
  selected?: Date | null;
  onChange?: (date: Date) => void;
  onDateSelected?: (date: Date) => void;
  className?: string;
}

export function DatePicker({ disabled, className, onDateSelected }: DatePickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { clearErrors } = form;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className={`flex flex-col ${className}`}>
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 justify-start text-left font-normal",
                      !field.value && !isClicked && className
                    )}
                    disabled={disabled}
                    onClick={() => setIsClicked(true)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    clearErrors("dob");
                    setIsClicked(false);
                    if (onDateSelected && date) {
                      onDateSelected(date);
                    }
                  }}
                  fromYear={1920}
                  toYear={new Date().getFullYear()}
                />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}