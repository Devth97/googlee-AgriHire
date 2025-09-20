
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";

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
import { generateJobDescriptionAction, createJobAction } from "@/lib/actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      workType: [],
      workersRequired: 1,
      description: "",
    },
  });
  
  const watchedWorkType = useWatch({ control: form.control, name: 'workType' });
  const watchedLocation = useWatch({ control: form.control, name: 'location' });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createJobAction(values);
      if (result.success) {
        toast({
          title: "Job Posted!",
          description: "Your new job has been successfully posted.",
        });
        form.reset();
        router.push('/farmer');
      } else {
        toast({
          variant: "destructive",
          title: "Failed to post job",
          description: result.error,
        });
      }
    });
  }
  
  async function handleGenerateDescription() {
    if (!watchedLocation || watchedWorkType.length === 0) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please select a location and at least one work type to generate a description."
        })
        return;
    }

    setIsGenerating(true);
    const workTypeLabels = watchedWorkType.map(id => workTypes.find(w => w.id === id)?.label || id);
    const formData = new FormData();
    workTypeLabels.forEach(wt => formData.append('workType', wt));
    formData.append('location', watchedLocation);
    
    const result = await generateJobDescriptionAction(formData);

    if (result.error) {
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: result.error,
        });
    } else if (result.description) {
        form.setValue("description", result.description);
        toast({
            title: "Description Generated!",
            description: "The AI has suggested a job description for you."
        })
    }
    setIsGenerating(false);
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
                        const workTypeLabel = item.label;
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(workTypeLabel)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), workTypeLabel])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== workTypeLabel
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
                    <div className="flex items-center justify-between">
                        <FormLabel>Job Description (Optional)</FormLabel>
                        <Button type="button" size="sm" variant="outline" onClick={handleGenerateDescription} disabled={isGenerating}>
                            {isGenerating ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4 text-accent" />
                            )}
                            Suggest with AI
                        </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about the work, requirements, and any other relevant information."
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
