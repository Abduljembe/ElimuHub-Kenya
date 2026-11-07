export interface WeakSpotItem {
  id: string;
  timestamp: number;
  subject: string;
  topic?: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

const STORAGE_KEY = 'elimuhub_weak_spots';

export function getWeakSpots(): WeakSpotItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToWeakSpots(item: Omit<WeakSpotItem, 'timestamp'>): void {
  try {
    const current = getWeakSpots();
    // Avoid duplicate questions
    const exists = current.some((q) => q.question.toLowerCase().trim() === item.question.toLowerCase().trim());
    if (exists) return;

    const updated = [{ ...item, timestamp: Date.now() }, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save to weak spots:', err);
  }
}

export function removeFromWeakSpots(id: string): WeakSpotItem[] {
  try {
    const current = getWeakSpots();
    const updated = current.filter((q) => q.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearWeakSpots(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear weak spots:', err);
  }
}
