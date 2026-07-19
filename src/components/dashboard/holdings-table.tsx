import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_HOLDINGS } from "@/lib/mock-portfolio";
import { cn } from "@/lib/utils";

export function HoldingsTable() {
  return (
    <Card className="border-border bg-card/60">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>Your holdings</CardTitle>
            <CardDescription>Startups you&apos;ve backed on Deswits</CardDescription>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            Sample data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 font-medium">Startup</th>
                <th className="pb-3 font-medium">Stage</th>
                <th className="pb-3 font-medium">Invested</th>
                <th className="pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_HOLDINGS.map((holding) => (
                <tr key={holding.name} className="border-b border-border/60 last:border-0">
                  <td className="py-4">
                    <div className="font-medium text-foreground">{holding.name}</div>
                    <div className="text-xs text-muted-foreground">{holding.sector}</div>
                    <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald to-emerald-glow"
                        style={{ width: `${holding.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge variant="secondary">{holding.stage}</Badge>
                  </td>
                  <td className="py-4 text-muted-foreground">{holding.invested}</td>
                  <td className="py-4 font-medium text-foreground">{holding.value}</td>
                  <td
                    className={cn(
                      "py-4 font-medium",
                      holding.positive ? "text-emerald" : "text-destructive"
                    )}
                  >
                    {holding.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
