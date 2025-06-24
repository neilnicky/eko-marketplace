import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { FEATURE_ITEMS } from "@/constants/dashboardFeatures";

export default function DashboardFeatureGrid() {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {FEATURE_ITEMS.map((feature, i) => {
        const IconComponent = feature.icon;
        return (
          <Link key={`${feature.title}-${i}`} href={feature.href} className="">
            <Card className="h-full hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 border-transparent border hover:border-primary">
              <CardContent className="px-3 md:px-4 flex flex-col items-center text-center">
                <div className="p-2.5 md:p-3 mb-1.5 md:mb-2 rounded-full inline-block bg-accent">
                  <IconComponent className=" h-6 w-6" />
                </div>
                <span className="font-semibold text-xs sm:text-sm md:text-base line-clamp-2 ">
                  {feature.title}
                </span>
                <p className="hidden md:block text-xs text-muted-foreground line-clamp-2">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

