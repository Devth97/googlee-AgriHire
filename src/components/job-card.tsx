import { Calendar, MapPin, Users, CheckCircle, Clock } from "lucide-react";
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
};

const statusColors = {
  Open: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700",
  Confirmed: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Completed: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/50 dark:text-gray-400 dark:border-gray-700",
};

export function JobCard({ job, userType }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{job.title}</CardTitle>
          <Badge className={`${statusColors[job.status]} transition-all`}>
             {job.status === 'Confirmed' && <CheckCircle className="mr-1 h-3 w-3" />}
             {job.status === 'Open' && <Clock className="mr-1 h-3 w-3" />}
             {job.status}
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
        {userType === 'worker' && job.status === 'Open' && (
          <div className="flex w-full gap-2">
            <Button className="w-full" variant="outline">Decline</Button>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Accept Job</Button>
          </div>
        )}
        {userType === 'worker' && job.status === 'Confirmed' && (
          <div className="flex w-full gap-2">
             <Button className="w-full" variant="outline">Chat with Farmer</Button>
             <Button className="w-full" variant="outline">Call Farmer (Masked)</Button>
          </div>
        )}
         {userType === 'worker' && job.status === 'Completed' && (
          <Button className="w-full" variant="secondary" disabled>Job Completed</Button>
        )}
      </CardFooter>
    </Card>
  );
}
