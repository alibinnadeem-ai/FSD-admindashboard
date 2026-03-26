import Link from 'next/link';

export default function GuestPassPage() {
    return (
        <main className="h-screen w-full bg-gray-50 flex flex-col">
            <iframe 
                src={process.env.NEXT_PUBLIC_GUESTPASS_URL} 
                className="w-full h-full border-none"
                title="GuestPass System"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
        </main>
    );
}
