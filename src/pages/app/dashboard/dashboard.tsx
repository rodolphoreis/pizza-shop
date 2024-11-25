import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-2xl font-bold"></CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
