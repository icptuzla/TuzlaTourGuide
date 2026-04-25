import React, { useEffect, useState, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Language } from "../types";
import { TRANSLATIONS, TUZLA_CENTER } from "../constants";
import { Info, MessageSquare, Clock, MapPin, Car } from 'lucide-react';

type ZoneKey = "Z0" | "Z1" | "Z2";
type PaymentType = "hourly" | "daily";

interface Zone {
    key: ZoneKey;
    name: string;
    price: number;
    dailyPrice: number;
    start: string;
    end: string;
    color: string;
    polygons: [number, number][][];
}

const zones: Zone[] = [
    {
        key: "Z0",
        name: "Zona 0",
        price: 2.0,
        dailyPrice: 6.0,
        start: "07:00",
        end: "22:00",
        color: "#ff6d6dff",
        polygons: [
            [
                [18.68373102183128, 44.53702777461152],
                [18.68057910185189, 44.53689139824603],
                [18.68062715831503, 44.53738516759798],
                [18.67928896376071, 44.53784503624844],
                [18.67879848088963, 44.53737646133006],
                [18.67745640226601, 44.53841704818442],
                [18.67778883357899, 44.53944344073103],
                [18.6766404401944, 44.54002486139823],
                [18.67556453731078, 44.53884514966497],
                [18.67810591854336, 44.53647285628657],
                [18.6795759050016, 44.53597250129297],
                [18.68067462484036, 44.53668709727778],
                [18.68373102183128, 44.53702777461152]
            ],
            [
                [44.5407672, 18.6682141],
                [44.5376643, 18.6916278],
                [44.5375725, 18.6916439],
                [44.5374769, 18.6918478],
                [44.5374081, 18.6925129],
                [44.5376452, 18.6925129],
                [44.5376643, 18.6916278],
            ],
        ]
    },
    {
        key: "Z1",
        name: "Zona 1",
        price: 1.0,
        dailyPrice: 5.0,
        start: "07:00",
        end: "22:00",
        color: "#52a3ffff",
        polygons: [
            [
                [18.68020604510661, 44.53511230143313],
                [18.67938161970201, 44.53544512740423],
                [18.67928755189453, 44.5353161167447],
                [18.68044257325981, 44.53478532131933],
                [18.68110624332838, 44.53449117088088],
                [18.6832108166917, 44.5358606385554],
                [18.68157954495487, 44.53620379973945],
                [18.68020604510661, 44.53511230143313],
            ],
            [

            ]
        ]
    },
    {
        key: "Z2",
        name: "Zona 2",
        price: 0.5,
        dailyPrice: 4.0,
        start: "07:00",
        end: "22:00",
        color: "#10b981",
        polygons: [
            [
                [18.67995081597946, 44.53832073588779],
                [18.67984721494177, 44.53819179410037],
                [18.68052018353578, 44.53800432587438],
                [18.6803805482287, 44.53755270527718],
                [18.68139457494927, 44.53758395827627],
                [18.68182336280222, 44.53808402997713],
                [18.68070664434541, 44.53834354198784],
                [18.68053273152799, 44.53812540470714],
                [18.67995081597946, 44.53832073588779]
            ],
            [
                [18.67764530300675, 44.54106986879132],
                [18.67668949156189, 44.54141325417599],
                [18.67620174759682, 44.54148943884937],
                [18.67574151507861, 44.54133913147831],
                [18.67548870692547, 44.54116436336978],
                [18.67636259617997, 44.54076135955496],
                [18.67615305256439, 44.54058835453593],
                [18.67673771959238, 44.54031646835008],
                [18.67764530300675, 44.54106986879132]
            ],
            [
                [18.6621634, 44.5382693],
                [18.6625393, 44.5381985],
                [18.663161, 44.5381766],
                [18.6631778, 44.5379309],
                [18.6634833, 44.5379447],
                [18.6640174, 44.5379622],
                [18.6640875, 44.5379645],
                [18.6649985, 44.5379825],
                [18.6650034, 44.5380751],
                [18.6649969, 44.5382125],
                [18.6649399, 44.5382134],
                [18.6649416, 44.5380756],
                [18.6640488, 44.5380626],
                [18.6640083, 44.5383995],
                [18.6640042, 44.5386199],
                [18.6636515, 44.5386033],
                [18.663612, 44.5387111],
                [18.6624482, 44.5386309],
                [18.6624444, 44.5384298],
                [18.6622363, 44.5384291],
                [18.6620285, 44.5384268],
                [18.6621634, 44.5382693],
            ],
            [
                [18.6733471, 44.5413220],
                [18.6732344, 44.5410398],
                [18.6733045, 44.5409131],
                [18.6733697, 44.5407092],
                [18.6736005, 44.5407534],
                [18.6735186, 44.5409769],
                [18.6735046, 44.5410903],
                [18.6735186, 44.5411681],
                [18.6735493, 44.5412866],
                [18.6733470, 44.5413220],
            ],
            [
                [18.6744169, 44.5404475],
                [18.6746521, 44.5403367],
                [18.6748074, 44.5405033],
                [18.6746583, 44.5405535],
                [18.6744169, 44.5404475],
            ],
        ]
    }
];

const smsNumbers = {
    hourly: { Z0: "0833510", Z1: "0833511", Z2: "0833512" },
    daily: { Z0: "0833513", Z1: "0833514", Z2: "0833515" },
};

const Parking: React.FC<{ lang: Language }> = ({ lang }) => {
    const t = TRANSLATIONS[lang];
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [plate, setPlate] = useState("");
    const [paymentType, setPaymentType] = useState<PaymentType>("hourly");
    const [activeUntil, setActiveUntil] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("parkingExpiry");
        if (stored) setActiveUntil(new Date(stored));
    }, []);

    useEffect(() => {
        if (!activeUntil) return;
        const interval = setInterval(() => {
            const diff = activeUntil.getTime() - new Date().getTime();
            if (diff <= 0) {
                setActiveUntil(null);
                localStorage.removeItem("parkingExpiry");
            } else {
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                setTimeLeft(`${h}h ${m}m ${s}s`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [activeUntil]);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.jawg.io/styles/jawg-streets.json?access-token=MJ1UjbO1irardUqAtZPQAzlWULZIZAFIsQdTrqkdC9bA34vgAGVMi20z7kP9ZRWX`,
            center: [TUZLA_CENTER[1], TUZLA_CENTER[0]],
            zoom: 14.5,
            pitch: 45
        });

        map.current.on('load', () => {
            setIsLoaded(true);

            zones.forEach(zone => {
                const id = `zone-${zone.key}`;
                map.current?.addSource(id, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: zone.polygons.map(p => ({
                            type: 'Feature',
                            properties: { zone: zone.key },
                            geometry: { type: 'Polygon', coordinates: [p] }
                        })) as any
                    }
                });

                map.current?.addLayer({
                    id: `${id}-fill`,
                    type: 'fill',
                    source: id,
                    paint: {
                        'fill-color': zone.color,
                        'fill-opacity': 0.3
                    }
                });

                map.current?.addLayer({
                    id: `${id}-outline`,
                    type: 'line',
                    source: id,
                    paint: {
                        'line-color': zone.color,
                        'line-width': 3,
                        'line-dasharray': [2, 1]
                    }
                });

                // Click listener
                map.current?.on('click', `${id}-fill`, () => {
                    setSelectedZone(zone);
                });

                // Hover style
                map.current?.on('mouseenter', `${id}-fill`, () => {
                    map.current!.getCanvas().style.cursor = 'pointer';
                    map.current?.setPaintProperty(`${id}-fill`, 'fill-opacity', 0.6);
                });
                map.current?.on('mouseleave', `${id}-fill`, () => {
                    map.current!.getCanvas().style.cursor = '';
                    map.current?.setPaintProperty(`${id}-fill`, 'fill-opacity', 0.3);
                });
            });
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, []);

    const userMarker = useRef<maplibregl.Marker | null>(null);

    // Geolocation effect
    useEffect(() => {
        if (!map.current || !isLoaded) return;

        let watchId: number;

        const startTracking = () => {
            watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    if (!userMarker.current) {
                        const el = document.createElement('div');
                        el.innerHTML = `<div style="background:#3b82f6;width:24px;height:24px;border-radius:50%;border:3px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(59,130,246,0.6);"><div style="width:8px;height:8px;background:#fff;border-radius:50%;" /></div>`;
                        userMarker.current = new maplibregl.Marker(el)
                            .setLngLat([longitude, latitude])
                            .addTo(map.current);

                        map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
                    } else {
                        userMarker.current.setLngLat([longitude, latitude]);
                    }
                },
                (err) => console.error(err),
                { enableHighAccuracy: true }
            );
        };

        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                startTracking();
            } else {
                if (watchId) navigator.geolocation.clearWatch(watchId);
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        if (document.visibilityState === 'visible') {
            startTracking();
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [isLoaded]);

    // Update highlight
    useEffect(() => {
        if (!isLoaded || !map.current) return;
        zones.forEach(z => {
            map.current?.setPaintProperty(`zone-${z.key}-fill`, 'fill-opacity', selectedZone?.key === z.key ? 0.7 : 0.3);
        });
    }, [selectedZone, isLoaded]);

    const isWithinTime = (zone: Zone) => {
        const now = new Date();
        const [sh, sm] = zone.start.split(":").map(Number);
        const [eh, em] = zone.end.split(":").map(Number);
        const start = new Date(); start.setHours(sh, sm, 0);
        const end = new Date(); end.setHours(eh, em, 0);
        return now >= start && now <= end;
    };

    const handlePay = () => {
        if (!selectedZone || !plate) {
            alert(t.parkingPromptPlate);
            return;
        }
        if (!isWithinTime(selectedZone)) {
            alert(t.parkingPaymentInactive);
            return;
        }
        const sms = smsNumbers[paymentType][selectedZone.key];
        window.location.href = `sms:${sms}?body=${plate}`;

        const expiry = new Date();
        paymentType === "hourly" ? expiry.setHours(expiry.getHours() + 1) : expiry.setHours(expiry.getHours() + 24);
        localStorage.setItem("parkingExpiry", expiry.toISOString());
        setActiveUntil(expiry);
    };

    return (
        <div className="h-[calc(100vh-88px)] w-full relative flex flex-col md:flex-row overflow-hidden bg-slate-50 font-quicksand">
            {/* Map Container */}
            <div ref={mapContainer} className="flex-grow z-0 relative h-1/2 md:h-full" />

            {/* Sidebar / Controls */}
            <div className="w-full md:w-[400px] h-1/2 md:h-full bg-white/95 backdrop-blur-md z-10 p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] overflow-y-auto flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tighter flex items-center gap-3">
                        <MapPin className="text-blue-600" /> {t.parkingTitle} <Car className="text-amber-500 w-8 h-8" />
                    </h1>
                    <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-[0.2em]">{lang === 'bs' ? 'Pametno Parkiranje' : 'Smart Parking Solutions'}</p>
                </div>

                {activeUntil && (
                    <div className="bg-amber-500 p-6 rounded-[2rem] shadow-[0_15px_35px_rgba(245,158,11,0.3)] animate-pulse border-4 border-white">
                        <p className="text-white/80 font-black uppercase text-[10px] tracking-widest">{t.parkingActive}</p>
                        <p className="text-3xl font-black text-white">{timeLeft}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                        {zones.map((zone) => (
                            <button
                                key={zone.key}
                                onClick={() => setSelectedZone(zone)}
                                className={`py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border-2 ${selectedZone?.key === zone.key
                                    ? "text-white shadow-xl scale-105"
                                    : "bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200"
                                    }`}
                                style={selectedZone?.key === zone.key ? { backgroundColor: zone.color, borderColor: zone.color } : {}}
                            >
                                {zone.name}
                            </button>
                        ))}
                    </div>

                    {selectedZone && (
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-black text-blue-900">{selectedZone.name}</span>
                                <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-black">
                                    {paymentType === "hourly" ? selectedZone.price : selectedZone.dailyPrice} KM
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{selectedZone.start} - {selectedZone.end}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">{t.parkingLicensePlate}</label>
                        <input
                            type="text"
                            placeholder="A12K345"
                            value={plate}
                            onChange={(e) => setPlate(e.target.value.toUpperCase())}
                            className="w-full p-5 rounded-[2rem] bg-slate-50 border-2 border-slate-100 text-blue-900 font-black text-xl shadow-inner focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-200"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setPaymentType("hourly")}
                            className={`flex-1 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all ${paymentType === "hourly"
                                ? "bg-blue-600 text-amber-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                : "bg-slate-100 text-slate-400"
                                }`}
                        >
                            {t.parkingHourly}
                        </button>
                        <button
                            onClick={() => setPaymentType("daily")}
                            className={`flex-1 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all ${paymentType === "daily"
                                ? "bg-amber-400 text-blue-900 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                : "bg-slate-100 text-slate-400"
                                }`}
                        >
                            {t.parkingDaily}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handlePay}
                    disabled={!selectedZone || !plate}
                    className={`w-full p-6 rounded-[2.5rem] text-lg font-black uppercase tracking-tighter shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${!selectedZone || !plate
                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'}`}
                >
                    <MessageSquare className="w-6 h-6" />
                    {t.parkingPaySms}
                </button>

                <div className="mt-auto p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                        {lang === 'bs'
                            ? 'Plaćanje se vrši putem SMS poruke. Obavezno provjerite validnost unešene tablice prije slanja.'
                            : 'Payment is made via SMS. Please double check your license plate number before sending.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Parking;