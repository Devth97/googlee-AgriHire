"use client";

import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockJobs } from "@/lib/data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const completedJobs = mockJobs.filter(job => job.status === "Completed");

export default function RatingsPage() {
    
    const [ratings, setRatings] = useState<{[key: string]: number}>({});

    const StarRating = ({ jobId }: { jobId: string }) => {
        const [hover, setHover] = useState(0);
        const rating = ratings[jobId] || 0;

        return (
            <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            key={ratingValue}
                            onClick={() => setRatings(prev => ({...prev, [jobId]: ratingValue}))}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <Star
                                className={cn("h-6 w-6 transition-colors",
                                    ratingValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )}
                            />
                        </button>
                    );
                })}
            </div>
        );
    };


    return (
        <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                 <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/farmer">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Rate Your Experience
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Completed Jobs</CardTitle>
                    <CardDescription>Leave feedback for the workers you've hired.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {completedJobs.map(job => (
                        <div key={job.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-semibold">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">Completed on {new Date(job.date).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <StarRating jobId={job.id} />
                            </div>
                        </div>
                    ))}
                    {completedJobs.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No completed jobs to rate yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
