import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { regionData } from "../data";

const geoUrl = "/uzbekistan_regional.json";

interface MapChartProps {
  setTooltipContent: (content: any) => void;
}

const MapChart: React.FC<MapChartProps> = ({ setTooltipContent }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2400,
          center: [64.5, 41.2], // Perfectly centered for Uzbekistan
        }}
        className="w-full h-full max-h-[80vh]"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const regionName = geo.properties.ADM1_EN;
              const data = regionData.find((r) => r.id === regionName) || { pageViews: 0, meetings: 0 };
              
              // Calculate a color based on page views (darker to lighter blue/purple)
              const intensity = Math.min(1, data.pageViews / 15000);
              const fill = `rgba(79, 70, 229, ${0.15 + intensity * 0.85})`; // Indigo base with higher contrast

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent({ name: regionName, ...data });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                  style={{
                    default: {
                      fill: fill,
                      stroke: "#ffffff", // Clear white border
                      strokeWidth: 1.5, // Thicker border for visibility
                      outline: "none",
                      transition: "all 250ms",
                    },
                    hover: {
                      fill: "#38bdf8", // Sky blue for clear hover contrast
                      stroke: "#ffffff",
                      strokeWidth: 2.5, // Even thicker on hover
                      outline: "none",
                      cursor: "pointer",
                      transition: "all 250ms",
                    },
                    pressed: {
                      fill: "#0284c7",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Markers for each region */}
        {regionData.map((region) => {
          if (!region.coordinates) return null;
          
          // Size based on page views
          const size = Math.max(3, Math.min(12, (region.pageViews / 15000) * 12));
          
          return (
            <Marker key={region.id} coordinates={region.coordinates as [number, number]}>
              <g
                onMouseEnter={() => {
                  setTooltipContent({ name: region.id, ...region });
                }}
                onMouseLeave={() => {
                  setTooltipContent(null);
                }}
                style={{ cursor: "pointer" }}
              >
                {/* Outer glowing pulse */}
                <circle
                  r={size * 2.5}
                  fill="#10b981"
                  opacity="0.2"
                  className="animate-ping"
                  style={{ transformOrigin: "center" }}
                />
                {/* Inner solid dot */}
                <circle
                  r={size}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth={1}
                />
              </g>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
