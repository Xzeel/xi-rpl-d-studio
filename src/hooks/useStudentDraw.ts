import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { members, type Member } from "@/data/members";

export function randomStudentIndex(count: number) {
  if (count < 1) throw new Error("Student list is empty");
  const buffer = new Uint32Array(1);
  const limit = Math.floor(4294967296 / count) * count;
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= limit);
  return buffer[0] % count;
}

export function useStudentDraw() {
  const [mode, setMode] = useState("wheel");
  const [busy, setBusy] = useState(false);
  const [winner, setWinner] = useState<Member | null>(null);
  const [preview, setPreview] = useState<Member | null>(null);
  const [rotation, setRotation] = useState(0);
  const [celebrating, setCelebrating] = useState(true);
  const lock = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
    if (interval.current) clearInterval(interval.current);
  }, []);

  function changeMode(value: string) {
    if (lock.current) return;
    setMode(value);
    setWinner(null);
    setPreview(null);
  }

  function draw() {
    if (lock.current || members.length === 0) return;
    lock.current = true;
    const index = randomStudentIndex(members.length);
    const selected = members[index];
    const duration = reduced ? 200 : mode === "wheel" ? 4200 : 1600;
    setBusy(true);
    setWinner(null);
    setCelebrating(true);
    if (mode === "wheel") {
      // Segment centers begin at twelve o'clock; land that center under the fixed pointer.
      const angle = (360 - index * 360 / members.length) % 360;
      setRotation(previous => previous + 360 * 6 + (angle - previous % 360 + 360) % 360);
    } else if (!reduced) {
      setPreview(members[randomStudentIndex(members.length)]);
      interval.current = setInterval(() => {
        setPreview(members[randomStudentIndex(members.length)]);
      }, 85);
    }
    timeout.current = setTimeout(() => {
      if (interval.current) clearInterval(interval.current);
      interval.current = null;
      setPreview(null);
      setWinner(selected);
      setBusy(false);
      lock.current = false;
    }, duration);
  }

  return { mode, changeMode, busy, winner, preview, rotation, celebrating,
    setCelebrating, draw, reduced, total: members.length };
}