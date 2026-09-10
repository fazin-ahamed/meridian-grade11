export type SidebarItem = {
  to?: string;
  label: string;
  active?: boolean;
};

export type SidebarModel = {
  mode: "global" | "chapter";
  backLabel: string;
  items: SidebarItem[];
};

export type SidebarModelInput = {
  pathname: string;
  subject?: string;
  chapterTitle?: string;
  topics?: readonly string[];
  activeTopic?: number;
};

const GLOBAL_ITEMS: SidebarItem[] = [
  { to: "/academy", label: "Atlas" },
  { to: "/academy/syllabus", label: "Syllabus" },
  { to: "/academy/practice", label: "Practice" },
  { to: "/academy/papers", label: "Papers" },
  { to: "/academy/start", label: "Start XI" },
  { to: "/academy/method", label: "Method" },
  { to: "/academy/tracks", label: "Tracks" },
  { to: "/academy/formulas", label: "Formulas" },
  { to: "/academy/boosters", label: "Boosters" },
  { to: "/academy/exam", label: "Exam lab" },
];

export function buildSidebarModel(input: SidebarModelInput): SidebarModel {
  const hasChapterRoute = input.pathname.startsWith("/academy/chapter/");
  const topics = input.topics ?? [];

  if (hasChapterRoute && topics.length > 0) {
    return {
      mode: "chapter",
      backLabel: "Back to Atlas",
      items: topics.map((label, index) => ({
        label,
        active: index === input.activeTopic,
      })),
    };
  }

  return {
    mode: "global",
    backLabel: "",
    items: GLOBAL_ITEMS.map((item) => ({
      ...item,
      active:
        item.to === "/academy"
          ? input.pathname === item.to
          : Boolean(item.to && input.pathname.startsWith(item.to)),
    })),
  };
}
