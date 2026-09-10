import { createContext, useContext, useEffect } from "react";

export type ChapterSidebarRegistration = {
  subject: string;
  chapterTitle: string;
  topics: readonly string[];
  activeTopic: number;
  onSelectTopic: (index: number) => void;
};

type ShellNavigationContextValue = {
  chapterSidebar: ChapterSidebarRegistration | null;
  setChapterSidebar: (registration: ChapterSidebarRegistration | null) => void;
};

export const ShellNavigationContext = createContext<ShellNavigationContextValue | null>(null);

export function useShellNavigation() {
  const value = useContext(ShellNavigationContext);
  if (!value) throw new Error("useShellNavigation must be used inside Shell");
  return value;
}

export function useRegisterChapterSidebar(registration: ChapterSidebarRegistration) {
  const { setChapterSidebar } = useShellNavigation();

  useEffect(() => {
    setChapterSidebar(registration);
    return () => setChapterSidebar(null);
  }, [registration, setChapterSidebar]);
}
