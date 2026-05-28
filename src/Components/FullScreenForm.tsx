import { useEffect, type ReactNode } from "react";

interface FullScreenFormProps {
  /** Form title displayed centred in the header */
  title: string;
  /** Called when the close button or confirm button is pressed */
  onClose: () => void;
  onConfirm: () => void;
  /** Label for the confirm button — defaults to "Confirm" */
  confirmLabel?: string;
  /** Accessible label for the landmark <section> */
  ariaLabel?: string;
  /** The form fields / body content */
  children: ReactNode;
}

/**
 * Reusable full-screen form shell.
 * Provides: header (close + centred title), scrollable body, and a sticky
 * confirm button pinned to the bottom.
 */
export default function FullScreenForm({
  title,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  ariaLabel,
  children,
}: FullScreenFormProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section
      className="flex flex-col absolute inset-0 z-250 max-h-full w-full bg-white dark:bg-midnight-950 px-5 pb-5"
      aria-label={ariaLabel ?? title}
    >
      {/* Header */}
      <header className="flex items-center justify-between pt-5 pb-5">
        <button
          type="button"
          aria-label={`Close ${title}`}
          className="rounded-full bg-gray-200 dark:bg-midnight-700 p-2 w-10 h-10 flex items-center justify-center cursor-pointer shadow-md dark:shadow-none hover:scale-105 transition-transform"
          onClick={onClose}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h1 className="text-xl font-semibold">{title}</h1>

        {/* Invisible spacer to keep title centred */}
        <div className="w-10" aria-hidden="true" />
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col gap-5">
        {children}
      </div>

      {/* Sticky confirm button */}

      <button
        type="button"
        className="bg-violet-600 hover:bg-violet-700 transition-colors text-white absoloute w-full p-3 rounded-xl font-medium cursor-pointer"
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
    </section>
  );
}
