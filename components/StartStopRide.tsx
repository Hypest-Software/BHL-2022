import React from "react";

interface StartStopRideProps {
}

export default function StartStopRide(props: StartStopRideProps) {
    const handleStartStop = () => {

    }

    const getTitle = () => {
        return "Rozpocznij przejazd";
    }

    return (
        <div className="max-w-7xl mx-4 space-y-4 py-4 sm:px-8 lg:px-8">
            <button
                className="btn-primary active:btn-secondary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleStartStop()}
            >
                {getTitle()}
            </button>
        </div>
    );
}
