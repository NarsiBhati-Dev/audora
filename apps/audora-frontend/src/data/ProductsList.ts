import { Podcast, MonitorPlay } from "lucide-react";
import { BsRecordCircle } from "react-icons/bs";
import { TbAdjustmentsAlt } from "react-icons/tb";

export const products = [
  {
    icon: BsRecordCircle,
    title: "Recording",
    description: "4K video and audio recorder.",
    href: "/recording",
  },
  {
    icon: TbAdjustmentsAlt,
    title: "Editing",
    description: "AI, text-based video editor.",
    href: "/video-editor",
  },
  {
    icon: Podcast,
    title: "Live Streaming",
    description: "For livestreams in full HD.",
    href: "/live-streaming",
  },
  {
    icon: MonitorPlay,
    title: "Webinars",
    description: "Host, record, and repurpose.",
    href: "/use-cases/webinars",
  },
  // {
  //   icon: Sparkles,
  //   title: "Magic Clips",
  //   description: "AI-generated highlight reels.",
  //   href: "/magic-clips",
  // },
];
