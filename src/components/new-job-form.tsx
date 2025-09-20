
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { workTypes, districts } from "@/lib/data";
import { suggestJobDescription } from "@/ai/ai-job-description-suggestion";

const formSchema = z.object({
  location: z.string().min(1, "Please select a location."),
  date: z.date({
    required_error: "A date for the job is required.",
  }),
  workType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one work type.",
  }),
  workersRequired: z.coerce.number().min(1, "At least one worker is required."),
  description: z.string().optional(),
});

export function NewJobForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSuggesting, setIsSuggesting] = React.useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      workType: [],
      workersRequired: 1,
      description: "",
    },
  });
  
  const handleSuggestDescription = async () => {
    const { workType, location, date, workersRequired, description } = form.getValues();
    if (!workType.length || !location || !date) {
        toast({
            variant: 'destructive',
            title: 'Please fill in details',
            description: 'Work Type, Location, and Date are needed to suggest a description.',
        });
        return;
    }
    
    setIsSuggesting(true);
    try {
        const result = await suggestJobDescription({
            workType,
            location,
            date: format(date, 'PPP'), // Correctly format the date
            numWorkersNeeded: workersRequired,
            additionalDetails: description,
        });
        form.setValue('description', result.jobDescription, { shouldValidate: true });
    } catch (error) {
        console.error("AI suggestion failed:", error);
        toast({
            variant: 'destructive',
            title: 'AI Suggestion Failed',
            description: 'Could not generate a description at this time.',
        });
    } finally {
        setIsSuggesting(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      // Simulate API call since we are using a mock database
      console.log("Form submitted with values:", values);
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        toast({
          title: "Job Posted! (Simulation)",
          description: "Your new job has been successfully posted.",
        });
        form.reset();
        router.push('/farmer');
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6 grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (District/City)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((d) => (
                           <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Work</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="workType"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Type of Work</FormLabel>
                    <FormDescription>
                      Select all work types that apply.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {workTypes.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="workType"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.label)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.label])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.label
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="workersRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Workers Required</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                        <FormLabel>Job Description (Optional)</FormLabel>
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={handleSuggestDescription}
                            disabled={isSuggesting}
                        >
                            {isSuggesting 
                                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                : <Sparkles className="mr-2 h-4 w-4" />
                            }
                            Suggest with AI
                        </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about the work, requirements, and any other relevant information. Or, let AI suggest a description for you!"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full md:w-auto ml-auto" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Review & Post Job
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
