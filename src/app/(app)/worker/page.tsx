import { JobCard } from "@/components/job-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockWorkerConfirmedJobs, mockWorkerRequests } from "@/lib/data";

export default function WorkerDashboard() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Jobs</h1>
      <Tabs defaultValue="requests">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="requests">New Job Requests</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          {mockWorkerRequests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {mockWorkerRequests.map((job) => (
                <JobCard key={job.id} job={job} userType="worker" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg mt-4">
              <h3 className="text-xl font-medium">No New Job Requests</h3>
              <p className="text-muted-foreground mt-2">Available jobs matching your profile will appear here.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="confirmed">
           {mockWorkerConfirmedJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {mockWorkerConfirmedJobs.map((job) => (
                <JobCard key={job.id} job={job} userType="worker" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg mt-4">
              <h3 className="text-xl font-medium">No Confirmed Jobs</h3>
              <p className="text-muted-foreground mt-2">Accepted jobs will appear here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
