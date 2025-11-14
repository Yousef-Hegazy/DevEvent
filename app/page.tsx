import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import {getAllEvents} from "@/api/generated";


export default async function Home() {
    const {data: events} = await getAllEvents({
        cache: "force-cache",
        next: {
            tags: ["events"],
            revalidate: 60, // 1 minute
        }
    });

    if (!events || events.length === 0) {
        return <p>Not found</p>
    }

    return (
        <section>
            <h1 className="text-center">
                The Hub for Every Dev <br/> Event You Can&apos;t Miss
            </h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences. All in one place.</p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7" id="events">
                <h3>Featured Events</h3>

                <ul className="events list-none">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                                location={event.location}
                                slug={event.slug || ""}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
