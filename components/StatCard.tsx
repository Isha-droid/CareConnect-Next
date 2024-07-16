import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx(
        "stat-card p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105",
        {
          "bg-gradient-to-r from-pink-500 to-red-500": type === "appointments",
          "bg-gradient-to-r from-red-400 to-gray-500": type === "pending",
          "bg-gradient-to-r from-gray-400 to-gray-600": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={type}
          className="size-8 w-fit"
        />
        <h2 className="text-4xl font-bold text-white">{count}</h2>
      </div>
      <p className="mt-2 text-lg text-white">{label}</p>
    </div>
  );
};
