import { useState, useEffect } from 'react'

export default function Accordion({
  children,
  title,
  id,
  active = false
}) {

  const [accordionOpen, setAccordionOpen] = useState(false)

  useEffect(() => {
    setAccordionOpen(active)
  }, [active, setAccordionOpen])

  return (
    <div className="py-2">
      <h2>
        <button
          className="flex items-center justify-between w-full text-left font-semibold"
          onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <span data-testid="title">{title}</span>
          <svg className="fill-indigo-500 shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <rect y="7" width="16" height="2" rx="1" className={`ttransform origin-center transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`} />
            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`} />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="pb-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}