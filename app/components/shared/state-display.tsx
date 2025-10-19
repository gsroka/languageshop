import { Button } from "~/components/ui/button";
import { Loader2Icon, SearchIcon } from "lucide-react";

interface StateDisplayProps {
  state: "loading" | "error" | "empty" | "success";
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StateDisplay: React.FC<StateDisplayProps> = ({
  state,
  title,
  message,
  action,
  icon,
  className = "container mx-auto py-12 text-center",
}) => {
  const getDefaultContent = () => {
    switch (state) {
      case "loading":
        return {
          title: "Loading...",
          message: "Please wait while we fetch your data.",
          icon: <Loader2Icon className="mx-auto h-8 w-8 animate-spin" />,
        };
      case "error":
        return {
          title: "Something went wrong",
          message: "Please try again later.",
          icon: (
            <Loader2Icon className="mx-auto h-8 w-8 text-destructive animate-spin" />
          ),
        };
      case "empty":
        return {
          title: "No items found",
          message: "Try adjusting your search criteria.",
          icon: (
            <SearchIcon className="mx-auto h-8 w-8 text-muted-foreground animate-pulse" />
          ),
        };
      default:
        return { title: "", message: "", icon: null };
    }
  };

  const defaults = getDefaultContent();

  return (
    <div className={className}>
      {icon || defaults.icon}
      <h3 className="mt-4 text-lg font-semibold">{title || defaults.title}</h3>
      <p className="mt-2 text-muted-foreground">
        {message || defaults.message}
      </p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
};
