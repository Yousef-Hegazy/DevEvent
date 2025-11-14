import {Metadata} from "next";
import {notFound} from "next/navigation";
import Image from "next/image";
import {EventDto, getEventBySlug} from "@/api/generated";

type Props = {
    params: Promise<{
        slug: string;
    }>
}

const getEvent = (slug: string) => getEventBySlug({
    path: {
        slug
    },
    cache: "force-cache",
    next: {
        tags: [slug],
        revalidate: 60, // 1 minute
    }
});

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params;

    const {data: event} = await getEvent(slug);

    return {
        title: `Event Details - ${event?.title}`,
        description: event?.description || "Detailed information about the events.",
    }
}

const EventDetailItem = ({icon, alt, label}: { icon: string; alt: string; label: string }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17}/>
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agenda}: { agenda: EventDto["agenda"] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agenda.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({tags}: { tags: EventDto["tags"] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div key={tag} className="pill">{tag}</div>
        ))}
    </div>
)

const EventDetailsPage = async ({params}: Props) => {
    const {slug} = await params;
    const res = await getEvent(slug);
    const event = res.data;

    if (!event || res.error) {
        notFound();
    }

    const {
        title,
        description,
        agenda,
        date,
        time,
        location,
        organizer,
        image,
        audience,
        mode,
        tags,
        overview,
        venue
    } = event;

    return (
        <section id="event">
            <div className="header">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                {/* Left Side Event Content */}
                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner"/>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date}/>
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time}/>
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location}/>
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode}/>
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience}/>
                    </section>

                    <EventAgenda agenda={agenda || []}/>

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />
                </div>
                {/* Right Side Booking Form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book your Spot</h2>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default EventDetailsPage;
