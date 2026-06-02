"use client";
import dynamic from "next/dynamic";

const ExperienceEngine = dynamic(
  () => import("@/components/experience/ExperienceEngine"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: "700vh", background: "transparent" }} />
    ),
  }
);

export default function AIBrigadeLanding() {
  return <ExperienceEngine />;
}
