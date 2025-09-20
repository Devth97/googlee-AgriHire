
"use client";

import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";
import { usePathname } from 'next/navigation'
import React from 'react'


import { Button } from "@/components/ui/button";
import { mockFarmerJobs } from "@/lib/data";
import { JobCard } from "@/components/job-card";

export default function FarmerDashboard() {
  const pathname = usePathname()
  const [jobs, setJobs] = React.useState(mockFarmerJobs)

  React.useEffect(() => {
    setJobs(mockFarmerJobs)
  }, [pathname])

  return (
    <div className="container mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link href="/jobs/new" className="w-full">
          <Button size="lg" className="w-full h-24 text-lg bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-6 w-6" /> Post New Job
          </Button>
        </Link>
        <Button size="lg" variant="secondary" className="w-full h-24 text-lg">
          <Search className="mr-2 h-6 w-6" /> Find Workers
        </Button>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-4">Your Active Jobs</h2>
      
      {jobs.length > 0 ? (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} userType="farmer" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-medium">No Active Jobs</h3>
            <p className="text-muted-foreground mt-2">Post a new job to find workers.</p>
            <Button asChild className="mt-4">
                <Link href="/jobs/new">Post a Job</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
