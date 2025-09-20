
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { JobCard } from "@/components/job-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';
import { mockJobs } from '@/lib/data';

interface Job {
  id: string;
  title: string;
  location: string;
  date: string;
  workersNeeded: number;
  workType: string[];
  status: 'Open' | 'Confirmed' | 'Completed';
  farmer: { name: string; avatarUrl: string };
}

export default function WorkerDashboard() {
  const [requests, setRequests] = useState<Job[]>([]);
  const [confirmedJobs, setConfirmedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setRequests(mockJobs.filter(j => j.status === 'Open'));
      setConfirmedJobs(mockJobs.filter(j => j.status === 'Confirmed'));
      setLoading(false);
    }, 1000);
  }, []);

  const handleJobAccepted = useCallback((acceptedJob: Job) => {
    setRequests(prev => prev.filter(job => job.id !== acceptedJob.id));
    setConfirmedJobs(prev => [{ ...acceptedJob, status: 'Confirmed' }, ...prev]);
  }, []);
  
  const renderJobList = (jobs: Job[], emptyTitle: string, emptyMessage: string) => {
    if (loading) {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      );
    }
    if (jobs.length > 0) {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              userType="worker" 
              onJobAccepted={() => handleJobAccepted(job)}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg mt-4">
        <h3 className="text-xl font-medium">{emptyTitle}</h3>
        <p className="text-muted-foreground mt-2">{emptyMessage}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Jobs</h1>
      <Tabs defaultValue="requests">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="requests">New Job Requests</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          {renderJobList(
            requests,
            "No New Job Requests",
            "Available jobs matching your profile will appear here."
          )}
        </TabsContent>
        <TabsContent value="confirmed">
           {renderJobList(
             confirmedJobs,
             "No Confirmed Jobs",
             "Accepted jobs will appear here."
           )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
