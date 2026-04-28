
import React, { useState, useEffect, useRef } from 'react';
import type { Html5Qrcode } from 'html5-qrcode';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Wallet as WalletIcon, Lock, Camera, CheckCircle2 } from 'lucide-react';



interface WalletProps {
    lang: Language;
}

const Wallet: React.FC<WalletProps> = ({ lang }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [bamValue, setBamValue] = useState<string>('');
    const [isForeground, setIsForeground] = useState(true);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const scannerContainerId = "wallet-reader";



    const t = TRANSLATIONS[lang];
    const eurValue = bamValue ? (parseFloat(bamValue) / 1.95583).toFixed(2) : '0.00';

    useEffect(() => {
        if (isScanning) startScanner();
        else stopScanner();
        return () => {
            void stopScanner();
        };
    }, [isScanning]);

    useEffect(() => {
        const handleVisibility = () => {
            const visible = document.visibilityState === 'visible';
            setIsForeground(visible);
            if (!visible) {
                setIsScanning(false);
                void stopScanner();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    useEffect(() => {
        if (!isForeground && isScanning) {
            setIsScanning(false);
        }
    }, [isForeground, isScanning]);

    const startScanner = async () => {
        try {
            setError(null);
            const { Html5Qrcode } = await import('html5-qrcode');
            const html5QrCode = new Html5Qrcode(scannerContainerId);
            html5QrCodeRef.current = html5QrCode;
            const config = { fps: 10, qrbox: (vw: number, vh: number) => { const s = Math.min(vw, vh) * 0.7; return { width: s, height: s }; } };
            await html5QrCode.start({ facingMode: "environment" }, config, handleScanSuccess, () => { });
        } catch (err) {
            setError("Camera access denied or error starting scanner.");
            setIsScanning(false);
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current?.isScanning) {
            try { await html5QrCodeRef.current.stop(); html5QrCodeRef.current.clear(); } catch (err) { }
        }
    };

    const handleScanSuccess = (decodedText: string) => {
        setSuccessMessage(`Scanned: ${decodedText}. Demo payment flow started.`);
        setTimeout(() => {
            setSuccessMessage("Demo only. Real wallet payments are not enabled in this build.");
            setIsScanning(false);
        }, 2000);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Subtle Background Animation */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-10 right-[-5%] w-[30%] h-[30%] bg-blue-600 rounded-full blur-[100px] animate-bounce" style={{ animationDuration: '8s' }}></div>
                <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-blue-300 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s' }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 pb-32">
                <div className="flex flex-col items-center text-center space-y-8 mb-16">
                    <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl glow-blue-strong">
                        <WalletIcon className="w-12 h-12" />
                    </div>

                    <h1 className="text-5xl font-black text-blue-950 uppercase tracking-tighter">
                        {t.wallet}
                    </h1>

                    <p className="text-blue-600 font-medium text-lg max-w-xl leading-relaxed">
                        A preview wallet screen for future Tuzla payment and rewards flows.
                        QR scanning is currently demonstration-only.
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Side: Scan & Pay & Calculator */}
                    <div className="space-y-8">
                        <div className="w-full p-8 glassy rounded-[3rem] border border-blue-100 shadow-xl space-y-6">
                            <div className="bg-white/50 p-6 rounded-2xl border border-white shadow-inner">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Demo Wallet</p>
                                        <p className="text-sm font-mono break-all text-blue-950">
                                            Payments disabled in this build
                                        </p>
                                    </div>

                            <button
                                onClick={() => setIsScanning(true)}
                                className="w-full h-[72px] flex items-center justify-center gap-2 bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-blue-700 transition-all glow-blue"
                            >
                                <Camera className="w-5 h-5" />
                                SCAN & PAY
                            </button>

                            {/* BAM to EURO Calculator */}
                            <div className="mt-8 pt-8 border-t border-blue-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                    <h3 className="text-sm font-black text-blue-950 uppercase tracking-widest">{t.bamToEur}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-blue-400 uppercase mb-2 block">{t.enterBam}</label>
                                        <input
                                            type="number"
                                            value={bamValue}
                                            onChange={(e) => setBamValue(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-blue-950 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                        />
                                    </div>
                                    <div className="bg-blue-900/5 p-4 rounded-xl border border-blue-100/50">
                                        <label className="text-[10px] font-bold text-blue-400 uppercase mb-1 block">{t.calculatedEur}</label>
                                        <div className="text-2xl font-black text-blue-600 font-mono">
                                            € {eurValue}
                                        </div>
                                        <p className="text-[9px] text-blue-300 mt-2 font-medium italic">{t.conversionRate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: User Manual */}
                    <div className="w-full p-8 glassy rounded-[3rem] border border-blue-100 shadow-xl space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black text-blue-950 uppercase tracking-tight">{t.walletManual}</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                                    {t.howToConnect}
                                </h4>
                                <p className="text-sm text-blue-900/70 font-medium leading-relaxed whitespace-pre-line bg-blue-50/30 p-4 rounded-2xl border border-blue-50/50">
                                    {t.connectSteps}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                                    {t.safeUsage}
                                </h4>
                                <p className="text-sm text-blue-900/70 font-medium leading-relaxed whitespace-pre-line bg-blue-50/30 p-4 rounded-2xl border border-blue-50/50">
                                    {t.safeTips}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                                    {t.txHistory}
                                </h4>
                                <p className="text-sm text-blue-900/70 font-medium leading-relaxed bg-blue-50/30 p-4 rounded-2xl border border-blue-50/50 italic">
                                    {t.historyLocation}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-3 text-green-500 bg-green-50/50 p-4 rounded-2xl border border-green-100">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <p className="text-[10px] font-bold uppercase tracking-wider leading-tight">
                                Wallet UI preview only. No blockchain transaction is executed here.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center text-blue-400/60 font-black text-[10px] uppercase tracking-[0.3em]">
                    DEMO EXPERIENCE: WALLET INTEGRATION PENDING
                </div>
            </div>

            <style>{`
                .glassy {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(20px);
                }
            `}</style>

            {/* Popups */}
            {successMessage && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-[500] animate-bounce">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-[500]">
                    {error}
                </div>
            )}

            {/* MODERN QR SCANNER OVERLAY */}
            {isScanning && (
                <div className="fixed inset-0 z-[600] flex flex-col items-center justify-center qr-scanner-overlay animate-in fade-in duration-500">
                    {/* Header */}
                    <div className="absolute top-0 w-full p-8 flex items-center justify-between z-[610]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1 text-left">Secure Payment</span>
                                <span className="text-xl font-black text-white uppercase tracking-tight font-quicksand text-left">SCAN & PAY</span>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsScanning(false); }}
                            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
                        >
                            <span className="text-2xl font-light">×</span>
                        </button>
                    </div>

                    {/* Scanner Frame */}
                    <div className="relative w-[85%] max-w-[400px] aspect-square qr-scanner-frame z-[605] transition-all">
                        {/* Camera Container */}
                        <div id={scannerContainerId} className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]"></div>
                        
                        {/* Animated Laser */}
                        <div className="qr-laser" />

                        {/* Corner Brackets */}
                        <div className="qr-corner qr-corner-tl" />
                        <div className="qr-corner qr-corner-tr" />
                        <div className="qr-corner qr-corner-bl" />
                        <div className="qr-corner qr-corner-br" />

                        {/* Scanning Mask Overlay */}
                        <div className="absolute inset-0 border-[30px] border-black/30 pointer-events-none" />
                    </div>

                    {/* Footer Info */}
                    <div className="absolute bottom-16 w-full text-center px-10 z-[610]">
                        <div className="inline-block p-6 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <p className="text-white/80 font-black uppercase text-[10px] tracking-[0.3em] font-quicksand mb-2">Align QR Code within frame</p>
                            <div className="flex items-center justify-center gap-3 text-white/40">
                                <div className="h-px w-8 bg-white/20"></div>
                                <span className="text-[10px] uppercase font-bold italic">Tuzla Secure Pay v1.0</span>
                                <div className="h-px w-8 bg-white/20"></div>
                            </div>
                        </div>
                    </div>

                    {/* Background Glows */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
