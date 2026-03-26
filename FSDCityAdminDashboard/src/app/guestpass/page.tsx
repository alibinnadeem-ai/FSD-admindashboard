'use client'

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function GuestPassPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* The Sidebar component needs these props for mobile management */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            {/* 
              We use lg:pl-72 because the Sidebar is fixed on desktop with width 72.
              This container holds the iframe which should take up all remaining space.
            */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-72 relative h-full">
                
                {/* Mobile menu button (since we don't have the Header here) */}
                <div className="lg:hidden fixed top-4 left-4 z-40">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-700 shadow-md border border-gray-200"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <span className="text-xl">☰</span>
                  </button>
                </div>

                <main className="flex-1 h-full w-full overflow-hidden">
                    <iframe 
                        src={process.env.NEXT_PUBLIC_GUESTPASS_URL} 
                        className="w-full h-full border-none"
                        title="GuestPass System"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                </main>
            </div>
        </div>
    );
}
