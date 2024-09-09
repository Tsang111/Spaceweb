"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

// CloseIcon component definition
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4 text-black"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Updated header section for News */}
      <div id="news" className="w-full font-bold md:px-20 py-10 mt-10 mb-10">
        <div className="max-w-7xl mx-auto mt-10">
          <h2 className="text-2xl md:text-5xl mb-2 text-white max-w-4xl ml-10">
            News
          </h2>
        </div>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-3 py-3 text-xs rounded-full font-bold bg-blue-500 text-white"
                  >
                    News
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Card List with increased gap and alignment fix */}
      <ul className="max-w-2xl mx-auto w-full gap-12 flex flex-col">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-400 rounded-xl cursor-pointer shadow-lg transition-all duration-300"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-bold text-neutral-800 dark:text-neutral-200"
                >
                  {card.title}
                </motion.h3>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-blue-500 hover:text-white text-black w-auto"
            >
              News
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}


const cards = [
    {
      
      title:
        "SpaceX launches third batch of satellites for NRO’s proliferated constellation",
      ctaText: "News",
      ctaLink:
        "https://spacenews.com/spacex-launches-third-batch-of-satellites-for-nros-proliferated-constellation/",
      content: () => {
        return (
          <p>
            On September 5, SpaceX successfully launched the NROL-113 mission for
            the National Reconnaissance Office (NRO) using a Falcon 9 rocket from
            Vandenberg Space Force Base in California. This mission marked the
            deployment of the third batch of satellites for a new imaging
            satellite constellation developed by SpaceX and Northrop Grumman.
            However, the specific number of satellites launched was not disclosed.
            After stage separation, the Falcon 9’s first-stage booster completed
            its 20th flight and successfully landed on a drone ship stationed in
            the Pacific Ocean. <br /> <br /> The NRO&apos;s strategy, highlighted by
            the mission emblem featuring blue circles representing a proliferated
            constellation of satellites, emphasises &quot;Strength in Numbers.&quot; This
            approach focuses on deploying numerous smaller satellites designed for
            enhanced capability and resilience. The NRO stated that the completion
            of three launches within just four months showcases this program&apos;s
            rapid deployment pace, with additional launches supporting the NRO’s
            proliferated architecture expected through 2028.
          </p>
        );
      },
    },
    {
      
      title: "Space startups eye opportunities in the orbital surveillance market",
      ctaText: "News",
      ctaLink:
        "https://spacenews.com/space-startups-eye-opportunities-in-the-orbital-surveillance-market/",
      content: () => {
        return (
          <p>
            Space startups are increasingly targeting the orbital surveillance
            market, particularly in geostationary orbit (GEO). Atomos Space and
            Katalyst Space are collaborating to retrofit existing satellites with
            advanced space domain awareness (SDA) sensors. Atomos plans two
            missions using its servicing vehicle, Quark, to attach Katalyst’s SDA
            payloads to commercial telecom satellites. This initiative aligns with
            the U.S. military&apos;s efforts to enhance its space surveillance capabilities
            in GEO, mainly as adversaries deploy new systems in this critical
            region.
            <br /> <br /> The market for SDA-hosted payloads is becoming highly
            competitive, with projections estimating it could reach around a
            billion dollars in the next five years. Katalyst’s Shield sensor,
            designed to retrofit ageing satellites, is positioned as a low-cost
            solution to fill intelligence gaps in GEO. Atomos and Katalyst are
            ramping up production and refining their technologies to meet the
            growing demand. Industry leaders, including Intelsat, are strongly
            interested in upgrading existing platforms, viewing such enhancements
            as a cost-effective strategy to optimize fleet capabilities for
            government partners.
          </p>
        );
      },
    },
    {
        title: "China's mysterious space plane returns to Earth after 268 days in orbit",
      ctaText: "News",
      ctaLink:
        "https://www.space.com/china-space-plane-lands-268-days",
      content: () => {
        return (
          <p>
            China&apos;s mysterious reusable space plane has returned to Earth after
            spending 268 days in orbit, landing at the Jiuquan Satellite Launch
            Center on September 6. Launched on December 14, 2023, from the same
            site atop a Long March 2F rocket, the spacecraft&apos;s capabilities and
            specific mission details remain largely undisclosed. Chinese state
            media suggested that the craft could facilitate more convenient and
            affordable space travel.
            <br /> <br /> During its orbit, the space plane was observed releasing
            a small object, which could have been a subsatellite or hardware
            ejected before deorbiting. It reportedly conducted rendezvous and
            proximity operations (RPO), testing its ability to manoeuvre close to
            other objects in space. Such techniques are believed to interest
            military powers for potential satellite servicing or combat scenarios.
            The mission occurred just before the U.S. Space Force&apos;s reusable vehicle,
            the X-37B, which operates under classified conditions.
          </p>
        );
      },
    },
    {
      title: "Lucky alignment of 2 spacecraft reveals how solar wind gets a magnetic push",
      ctaText: "News",
      ctaLink:
        "https://www.space.com/lucky-alignment-spacecraft-sun-solar-wind-mystery",
      content: () => {
        return (
          <p>
            A recent study has revealed how the solar wind accelerates to high
            speeds, thanks to the collaboration between NASA&apos;s Parker Solar Probe and
            the European Space Agency&apos;s Solar Orbiter. These spacecraft observed
            the same patch of solar wind over two days in February 2022, with
            Parker detecting the wind traveling at 242 miles (390 km) per second
            along with energy-rich Alfvén waves, while Solar Orbiter recorded it
            at an even faster speed of 317 miles (510 km) per second. Researchers
            found that the energy gained by the solar wind matched the energy lost
            by the Alfvén waves, providing definitive evidence that these waves
            can accelerate the solar wind.
            <br /> <br /> The study highlights the role of abrupt reversals in the
            sun&apos;s magnetic field, known as &quot;switchbacks,&quot; which contribute to the
            energy needed for the solar wind&apos;s acceleration and heating as it moves
            away from the sun. This research not only addresses a long-standing
            question about solar wind dynamics but also has implications for
            understanding other stars with similar winds. The findings underscore
            the importance of collaborative observations in advancing our
            understanding of solar phenomena.
          </p>
        );
      },
    },
    {
    title:
        "Boeing Starliner’s parachute team readies for Crew Flight Test landing without astronauts on September 7, 2024",
      ctaText: "News",
      ctaLink:
        "https://www.space.com/boeing-starliner-parachute-landing-crew-flight-test",
      content: () => {
        return (
          <p>
            Boeing&apos;s Starliner spacecraft is set to make a twilight landing on
            September 7, 2024, following its undocking from the International
            Space Station on September 6. The Crew Flight Test (CFT) will occur
            without astronauts, as NASA has shifted the crew to SpaceX&apos;s Crew
            Dragon due to unresolved propulsion issues with Starliner. This
            mission comes after design changes were made to the parachute system,
            which encountered problems last year. During a recent interview,
            NASA&apos;s Jim McMichael, who oversees parachute integration, discussed the
            team&apos;s confidence in the system&apos;s reliability.
            <br /> <br /> The parachute system for Starliner is a scaled version of
            the Orion system designed to ensure safe landings. McMichael noted
            that the team had conducted extensive testing to improve parachute
            components while maintaining qualification test history. Preparing for
            the first operational crewed mission in 2025, the team will carefully
            inspect the CFT parachutes post-landing to ensure their integrity. The
            parachute team remains focused on the critical final phase of
            landings, emphasising the importance of their role in ensuring
            astronaut safety during re-entry.
          </p>
        );
      },
    },
  ];
  
  export default ExpandableCardDemo;
  