import { TrendingUp, Users, Building, Award } from "lucide-react"

export function PlacementStats() {
  return (
    <div className="mb-8 grid gap-4 rounded-lg border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Average Package</p>
          <p className="text-2xl font-bold">₹18.5 LPA</p>
          <p className="text-xs text-green-600">↑ 12% from last year</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Students Placed</p>
          <p className="text-2xl font-bold">1,245</p>
          <p className="text-xs text-green-600">92% placement rate</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Building className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Companies Visited</p>
          <p className="text-2xl font-bold">85+</p>
          <p className="text-xs text-green-600">↑ 15 new this year</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Highest Package</p>
          <p className="text-2xl font-bold">₹45 LPA</p>
          <p className="text-xs text-green-600">International offer</p>
        </div>
      </div>
    </div>
  )
}
