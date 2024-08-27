import { Metadata } from "next";
import GuestbookForm from "../components/guestbook-form";
import { siteMetadata } from "../site-metadata";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and share your thoughts.",
  openGraph: {
    title: `Guestbook | ${siteMetadata.name}`,
    description: "Sign my guestbook and share your thoughts.",
    url: `${siteMetadata.url}/guestbook`,
  },
};

export default function Guestbook() {
  return <GuestbookForm />;
}
