import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, Plus, Minus } from "lucide-react";

const transactions = [
  { id: 1, type: "Job Payment", amount: -2500, date: "2024-08-05", status: "Completed", description: "Payment for harvesting job" },
  { id: 2, type: "Wallet Top-up", amount: 5000, date: "2024-08-02", status: "Success", description: "Added funds from bank" },
  { id: 3, type: "Job Payment", amount: -1200, date: "2024-07-28", status: "Completed", description: "Payment for weeding" },
];

export default function PaymentsPage() {
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
                    Payments & Wallet
                </h1>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Your Wallet</CardTitle>
                    <CardDescription>Manage your funds and view your balance.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-4xl font-bold">₹ 12,500</p>
                    </div>
                    <div className="flex gap-2">
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Funds</Button>
                        <Button variant="outline"><Minus className="mr-2 h-4 w-4" /> Withdraw</Button>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <div className="font-medium flex items-center gap-2">
                                            {tx.amount > 0 ? <ArrowDownLeft className="h-4 w-4 text-green-500"/> : <ArrowUpRight className="h-4 w-4 text-red-500" />}
                                            {tx.description}
                                        </div>
                                        <div className="text-sm text-muted-foreground md:hidden">{tx.date}</div>
                                    </TableCell>
                                    <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ₹ {Math.abs(tx.amount).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right text-muted-foreground">{tx.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
