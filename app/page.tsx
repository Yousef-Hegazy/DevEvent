import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences. All in one place.</p>

      <button type="button" id="explore-btn" className="mt-7 mx-auto">
        <a href="#events">
          Explore Events <Image src="/icons/arrow-down.svg" alt="arrow" width={24} height={24} />
        </a>
      </button>

      <div className="mt-20 space-y-7" id="events">
        <h3>Featured Events</h3>

        <ul className="events list-none">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
