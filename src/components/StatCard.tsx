import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "processing";
}

const StatCard = ({ title, value, icon: Icon, variant = "default" }: StatCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "processing":
        return "text-processing";
      default:
        return "text-academic";
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-muted ${getVariantStyles()}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;