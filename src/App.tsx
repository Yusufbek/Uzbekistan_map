/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import MapChart from "./components/MapChart";
import { regionData } from "./data";
import { Activity, Users, Globe, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [tooltipContent, setTooltipContent] = useState<any>(null);

  const totalPageViews = regionData.reduce((acc, curr) => acc + curr.pageViews, 0);
  const totalMeetings = regionData.reduce((acc, curr) => acc + curr.meetings, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="px-8 py-6 border-b border-white/10 flex items-center justify-between z-10 relative bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Live View</h1>
            <p className="text-sm text-gray-400">Uzbekistan Traffic & Conversions</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400">Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex relative">
        {/* Sidebar Metrics */}
        <div className="w-80 border-r border-white/10 p-8 flex flex-col gap-8 z-10 bg-[#0a0a0a]/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Page Views</h2>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light tracking-tight">{totalPageViews.toLocaleString()}</span>
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Meetings Booked</h2>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light tracking-tight">{totalMeetings.toLocaleString()}</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Top Regions</h3>
            <div className="space-y-4">
              {regionData
                .sort((a, b) => b.pageViews - a.pageViews)
                .slice(0, 5)
                .map((region, idx) => (
                  <div key={region.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gray-500 w-4">{idx + 1}</span>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{region.id}</span>
                    </div>
                    <span className="text-sm font-mono text-indigo-400">{region.pageViews.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0a] to-[#0a0a0a]">
          <MapChart setTooltipContent={setTooltipContent} />
          
          {/* Tooltip */}
          <AnimatePresence>
            {tooltipContent && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl min-w-[300px] pointer-events-none"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-medium">{tooltipContent.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Page Views</p>
                    <p className="text-2xl font-light text-indigo-400">{tooltipContent.pageViews.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Meetings</p>
                    <p className="text-2xl font-light text-emerald-400">{tooltipContent.meetings.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
