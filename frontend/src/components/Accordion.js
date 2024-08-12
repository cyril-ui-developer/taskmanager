import { useState, useEffect } from "react";

const getPriorityAttributes = (priority) => {
  switch (priority) {
    case "low":
      return {
        className:
          "border bg-green-400 border-gray-200 rounded-full px-4 text-sm text-white py-0.5",
        title: "Low Priority",
        label: "L",
      };
    case "medium":
      return {
        className:
          "border bg-yellow-400 border-gray-200 rounded-full px-4 text-sm text-white py-0.5",
        title: "Medium Priority",
        label: "M",
      };
    case "high":
      return {
        className:
          "border bg-red-400 border-gray-200 rounded-full px-4 text-sm text-white py-0.5",
        title: "High Priority",
        label: "H",
      };
    default:
      return {
        className:
          "border bg-gray-800 border-gray-200 rounded-full px-4 text-sm text-white py-0.5",
        title: "No Priority",
        label: "N/A",
      };
  }
};

export default function Accordion({
  children,
  title,
  id,
  active = false,
  dueDateTime,
  priority,
}) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    setAccordionOpen(active);
  }, [active, setAccordionOpen]);
  const priorityAttributes = getPriorityAttributes(priority);
  return (
    <div className="py-2">
      <h2>
        <button
          className="flex items-center justify-between w-full text-left font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <span className="pr-2">{dueDateTime}</span>
          <span data-testid="title" className="flex-1 text-justify">
            {title}
          </span>
          <span
            className={priorityAttributes.className}
            title={priorityAttributes.title}
          >
            {priorityAttributes.label}
          </span>
          <svg
            className="fill-indigo-500 shrink-0 ml-8"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`ttransform origin-center transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                accordionOpen && "!rotate-180"
              }`}
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
