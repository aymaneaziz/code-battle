import { usePlayerInfo } from "./usePlayerInfo";

export function useUserId() {
  const { userId } = usePlayerInfo();
  return userId;
}
