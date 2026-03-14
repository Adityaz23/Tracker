import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const columns = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        
        {/* Header */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {columns.map((col) => (
            <div key={col} className="rounded-xl border p-4">

              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              {/* Add Job Button */}
              <Skeleton className="h-9 w-full rounded-md mb-4" />

              {/* Job Cards */}
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border p-4 space-y-3"
                  >
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />

                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-5 w-14 rounded-md" />
                      <Skeleton className="h-5 w-16 rounded-md" />
                    </div>

                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}