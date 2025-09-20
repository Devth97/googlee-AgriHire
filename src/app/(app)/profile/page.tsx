import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, Edit, MapPin, Star, Tag, Wallet } from "lucide-react";
import { mockProfile } from "@/lib/data";

export default function ProfilePage() {
    return (
        <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/worker">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Your Profile
                </h1>
                <Button size="sm" className="ml-auto">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <Image
                        src="https://picsum.photos/seed/worker-profile/100/100"
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-primary/50"
                        data-ai-hint="person smiling"
                    />
                    <div className="flex-1">
                        <CardTitle className="text-3xl font-bold">{mockProfile.name}</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">{mockProfile.phone}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-lg">{mockProfile.rating}</span>
                            <span className="text-muted-foreground">(12 reviews)</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-6 grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p className="text-muted-foreground">{mockProfile.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Wallet className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Expected Wage</h3>
                                <p className="text-muted-foreground">{mockProfile.wage}</p>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Tag className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {mockProfile.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="text-base">{skill}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Calendar className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Availability</h3>
                            <p className="text-muted-foreground">You are marked as available for the following dates:</p>
                             <div className="flex flex-wrap gap-2 mt-2">
                                {mockProfile.availability.map(date => (
                                    <Badge key={date.toString()} variant="default" className="text-sm">
                                        {format(date, "MMM dd")}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
