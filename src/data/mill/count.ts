import { CATALOG } from "../catalog";
import { MILL_PER_CHAPTER } from "./build";

export { MILL_PER_CHAPTER };

export function millCount() {
  return CATALOG.length * MILL_PER_CHAPTER;
}
