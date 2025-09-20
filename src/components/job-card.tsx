
"use client";

import { Calendar, MapPin, Users, CheckCircle, Clock, Loader2, MessageSquare, Phone, Send, PhoneOff } from "lucide-react";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { acceptJobAction } from "@/lib/actions";
import React, { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Job = {
  id: string;
  title: string;
  location: string;
  date: string;
  workersNeeded: number;
  workType: string[];
  status: 'Open' | 'Confirmed' | 'Completed';
  farmer: { name: string; avatarUrl: string };
};

type JobCardProps = {
  job: Job;
  userType: 'farmer' | 'worker';
  onJobAccepted?: () => void;
};

const statusColors = {
  Open: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700",
  Confirmed: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Completed: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/50 dark:text-gray-400 dark:border-gray-700",
};

export function JobCard({ job, userType, onJobAccepted }: JobCardProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAccepted, setIsAccepted] = React.useState(job.status === 'Confirmed');


  const handleAcceptJob = () => {
    startTransition(async () => {
      const result = await acceptJobAction(job.id);
      if (result.success) {
        toast({
          title: "Job Accepted!",
          description: "This job has been moved to your confirmed list.",
        });
        setIsAccepted(true);
        if(onJobAccepted) {
            onJobAccepted();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Failed to accept job",
          description: result.error,
        });
      }
    });
  };
  
  const currentStatus = isAccepted ? 'Confirmed' : job.status;

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{job.title}</CardTitle>
          <Badge className={`${statusColors[currentStatus]} transition-all`}>
             {currentStatus === 'Confirmed' && <CheckCircle className="mr-1 h-3 w-3" />}
             {currentStatus === 'Open' && <Clock className="mr-1 h-3 w-3" />}
             {currentStatus}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-2">
            <Image 
                src={job.farmer.avatarUrl} 
                alt={job.farmer.name} 
                width={24} 
                height={24} 
                className="rounded-full"
                data-ai-hint="person portrait"
            />
            Posted by {job.farmer.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4 text-primary" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4 text-primary" />
          <span>{new Date(job.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4 text-primary" />
          <span>{job.workersNeeded} Workers Needed</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
            {job.workType.map(type => (
                <Badge key={type} variant="secondary">{type}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        {userType === 'farmer' && (
          <Button className="w-full" variant="outline">
            View Applicants
          </Button>
        )}
        {userType === 'worker' && currentStatus === 'Open' && (
          <div className="flex w-full gap-2">
            <Button className="w-full" variant="outline" disabled={isPending}>Decline</Button>
            <Button 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
              onClick={handleAcceptJob}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Accept Job"}
            </Button>
          </div>
        )}
        {userType === 'worker' && currentStatus === 'Confirmed' && (
          <div className="flex w-full gap-2">
             <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full" variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Chat</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chat with {job.farmer.name}</DialogTitle>
                        <DialogDescription>
                            Ask questions about the job, location, or payment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
                        <div className="flex items-end gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={job.farmer.avatarUrl} alt={job.farmer.name} />
                                <AvatarFallback>{job.farmer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg bg-muted p-3 text-sm">
                                <p>Hello! I've accepted the job. When should I arrive?</p>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 justify-end">
                            <div className="rounded-lg bg-primary text-primary-foreground p-3 text-sm">
                                <p>Hi there! Glad to have you. Please arrive at 8 AM sharp.</p>
                            </div>
                             <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/worker-me/40/40" alt="You" />
                                <AvatarFallback>Y</AvatarFallback>
                            </Avatar>
                        </div>
                         <div className="flex items-end gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={job.farmer.avatarUrl} alt={job.farmer.name} />
                                <AvatarFallback>{job.farmer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg bg-muted p-3 text-sm">
                                <p>The location is on the main road, you can't miss the big green gate.</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex w-full gap-2">
                            <Input placeholder="Type your message..." />
                            <Button><Send className="h-4 w-4"/></Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
             </Dialog>
             <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full" variant="outline"><Phone className="mr-2 h-4 w-4" /> Call (Masked)</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs">
                     <DialogHeader className="text-center">
                        <DialogTitle>Calling {job.farmer.name}...</DialogTitle>
                        <DialogDescription>
                           Connecting via a secure, masked number.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-8 gap-4">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-primary">
                                <AvatarImage src={job.farmer.avatarUrl} alt={job.farmer.name} />
                                <AvatarFallback className="text-4xl">{job.farmer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <div className="absolute -bottom-2 -right-2 bg-background p-1 rounded-full">
                                <Phone className="h-6 w-6 text-green-500 animate-pulse" />
                            </div>
                        </div>
                        <p className="font-semibold text-lg">01:23</p>
                        <DialogClose asChild>
                            <Button variant="destructive" size="lg" className="rounded-full w-24 h-16">
                                <PhoneOff className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
             </Dialog>
          </div>
        )}
         {userType === 'worker' && currentStatus === 'Completed' && (
          <Button className="w-full" variant="secondary" disabled>Job Completed</Button>
        )}
      </CardFooter>
    </Card>
  );
}
