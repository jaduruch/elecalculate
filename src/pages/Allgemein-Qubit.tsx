import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Qubit.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div
			ref={controller.root}
			data-ready={controller.ready ? "true" : undefined}
			className="page-body qubit-page"
		>
			<style>
				{
					"@layer source { @scope (.page-body) {\n\n        /* Qubit page specific styles */\n        .bloch-container {\n            display: flex;\n            flex-wrap: wrap;\n            justify-content: center;\n            gap: 30px;\n            padding: 20px;\n            max-width: 1200px;\n            margin: 0 auto;\n        }\n\n        #bloch-canvas-container {\n            width: 450px;\n            height: 450px;\n            border: 1px solid rgba(78, 205, 196, 0.3);\n            border-radius: 16px;\n            background: radial-gradient(ellipse at center, #0a0a1a 0%, #050510 100%);\n            position: relative;\n            touch-action: none;\n            overflow: hidden;\n        }\n\n        .canvas-hint {\n            position: absolute;\n            bottom: 12px;\n            right: 12px;\n            color: rgba(78, 205, 196, 0.4);\n            cursor: help;\n            transition: all 0.3s ease;\n            z-index: 10;\n            padding: 6px;\n            border-radius: 50%;\n            background: rgba(0, 0, 0, 0.3);\n        }\n        .canvas-hint:hover {\n            color: rgba(78, 205, 196, 0.9);\n            background: rgba(0, 0, 0, 0.6);\n            transform: scale(1.1);\n        }\n\n        .controls-panel {\n            min-width: 300px;\n            max-width: 400px;\n            text-align: left;\n        }\n\n        .gate-section {\n            margin-bottom: 25px;\n            padding: 15px;\n            background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(0, 0, 0, 0.1) 100%);\n            border-radius: 12px;\n            border: 1px solid rgba(255, 255, 255, 0.05);\n        }\n\n        .gate-section h3 {\n            margin: 0 0 12px 0;\n            color: #00d4aa;\n            font-size: 11px;\n            text-transform: uppercase;\n            letter-spacing: 2px;\n            font-weight: 600;\n            text-shadow: 0 0 10px rgba(0, 212, 170, 0.3);\n            display: flex;\n            align-items: center;\n            gap: 8px;\n        }\n\n        .gate-section h3::before {\n            content: '';\n            display: inline-block;\n            width: 3px;\n            height: 12px;\n            background: currentColor;\n            border-radius: 2px;\n            box-shadow: 0 0 8px currentColor;\n        }\n\n        .gate-buttons {\n            display: flex;\n            flex-wrap: wrap;\n            gap: 10px;\n        }\n\n        .gate-btn {\n            width: 56px;\n            height: 56px;\n            border: 2px solid #00d4aa;\n            border-radius: 12px;\n            background: rgba(0, 212, 170, 0.05);\n            color: #00d4aa;\n            font-size: 20px;\n            font-weight: bold;\n            cursor: pointer;\n            transition: all 0.2s ease;\n            position: relative;\n            overflow: hidden;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            line-height: 1;\n        }\n\n        .gate-btn::before {\n            content: '';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            width: 0;\n            height: 0;\n            background: radial-gradient(circle, currentColor 0%, transparent 70%);\n            opacity: 0;\n            transform: translate(-50%, -50%);\n            transition: all 0.3s ease;\n        }\n\n        .gate-btn:hover {\n            transform: scale(1.05);\n            background: rgba(0, 212, 170, 0.15);\n        }\n\n        .gate-btn:hover::before {\n            width: 120%;\n            height: 120%;\n            opacity: 0.1;\n        }\n\n        .gate-btn:active {\n            transform: scale(0.95);\n        }\n\n        .gate-btn.pauli { \n            border-color: #ff6b6b; \n            color: #ff6b6b; \n            background: rgba(255, 107, 107, 0.08);\n        }\n        .gate-btn.pauli:hover { \n            background: rgba(255, 107, 107, 0.2);\n        }\n\n        .gate-btn.hadamard { \n            border-color: #4ecdc4; \n            color: #4ecdc4; \n            background: rgba(78, 205, 196, 0.08);\n        }\n        .gate-btn.hadamard:hover { \n            background: rgba(78, 205, 196, 0.2);\n        }\n\n        .gate-btn.phase { \n            border-color: #ffe66d; \n            color: #ffe66d; \n            background: rgba(255, 230, 109, 0.08);\n        }\n        .gate-btn.phase:hover { \n            background: rgba(255, 230, 109, 0.2);\n        }\n\n        .gate-btn.measure { \n            border-color: #c44dff; \n            color: #c44dff; \n            width: auto; \n            padding: 0 20px; \n            background: rgba(196, 77, 255, 0.08);\n        }\n        .gate-btn.measure:hover { \n            background: rgba(196, 77, 255, 0.2);\n        }\n\n        .gate-btn.reset { \n            border-color: #888; \n            color: #888; \n            width: auto; \n            padding: 0 20px; \n            background: rgba(136, 136, 136, 0.08);\n        }\n        .gate-btn.reset:hover { \n            background: rgba(136, 136, 136, 0.2);\n        }\n\n        /* Ripple animation on click */\n        @keyframes ripple {\n            0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }\n            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }\n        }\n\n        .gate-btn.clicked::after {\n            content: '';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            width: 50px;\n            height: 50px;\n            background: currentColor;\n            border-radius: 50%;\n            animation: ripple 0.6s ease-out;\n            pointer-events: none;\n        }\n\n        .state-display {\n            background: linear-gradient(135deg, rgba(20, 20, 35, 0.95) 0%, rgba(10, 10, 20, 0.98) 100%);\n            border: 1px solid rgba(78, 205, 196, 0.3);\n            border-radius: 12px;\n            padding: 20px;\n            margin-top: 20px;\n            font-family: 'Courier New', monospace;\n            position: relative;\n            overflow: hidden;\n            min-height: 180px;\n            height: 180px;\n        }\n\n        .state-display::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 1px;\n            background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.5), transparent);\n        }\n\n        .state-display h4 {\n            margin: 0 0 15px 0;\n            color: #00d4aa;\n            font-size: 11px;\n            text-transform: uppercase;\n            letter-spacing: 2px;\n            position: relative;\n            z-index: 2;\n        }\n\n        .state-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: linear-gradient(135deg, rgba(20, 20, 35, 0.97) 0%, rgba(10, 10, 20, 0.99) 100%);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            z-index: 10;\n            opacity: 0;\n            pointer-events: none;\n            transition: opacity 0.15s ease;\n            border-radius: 12px;\n        }\n        .state-overlay.active {\n            opacity: 1;\n        }\n        .state-loading {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            gap: 12px;\n            color: rgba(78, 205, 196, 0.8);\n            font-size: 12px;\n            letter-spacing: 1px;\n        }\n        .quantum-spinner {\n            width: 30px;\n            height: 30px;\n            border: 2px solid rgba(78, 205, 196, 0.2);\n            border-top-color: #4ecdc4;\n            border-radius: 50%;\n            animation: spin 0.8s linear infinite;\n        }\n        @keyframes spin {\n            to { transform: rotate(360deg); }\n        }\n\n        .state-line {\n            margin: 8px 0;\n            font-size: 14px;\n            padding: 8px 12px;\n            border-radius: 6px;\n            background: rgba(0, 0, 0, 0.3);\n            min-width: 320px;\n            height: 36px;\n            display: flex;\n            align-items: center;\n            overflow: hidden;\n            transition: opacity 0.15s ease;\n            text-overflow: ellipsis;\n        }\n\n        .state-psi { \n            color: #4ecdc4; \n        }\n        .state-prob { \n            color: #ffe66d; \n        }\n        .state-coords { \n            color: #ff6b6b; \n        }\n\n        /* Hide raw MathJax during rendering */\n        .state-line.rendering {\n            opacity: 0.3;\n        }\n\n        /* Easter egg hint */\n        .easter-egg-hint {\n            font-size: 10px;\n            color: rgba(255, 230, 109, 0.6);\n            text-align: center;\n            margin-top: 8px;\n            font-style: italic;\n            animation: hintPulse 3s ease-in-out infinite;\n        }\n        @keyframes hintPulse {\n            0%, 100% { opacity: 0.4; }\n            50% { opacity: 0.8; }\n        }\n\n        /* Fraction styling for quantum notation */\n        .frac {\n            display: inline-block;\n            text-align: center;\n            vertical-align: middle;\n        }\n        .frac sup {\n            display: block;\n            font-size: 0.85em;\n            line-height: 1;\n            border-bottom: 1px solid currentColor;\n            padding-bottom: 2px;\n        }\n        .frac sub {\n            display: block;\n            font-size: 0.85em;\n            line-height: 1;\n            padding-top: 2px;\n        }\n\n        .custom-rotation {\n            margin-top: 15px;\n        }\n\n        .slider-row {\n            display: flex;\n            align-items: center;\n            margin: 12px 0;\n            gap: 15px;\n        }\n\n        .slider-row label {\n            width: 30px;\n            color: #4ecdc4;\n            font-size: 18px;\n            font-weight: bold;\n            text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);\n        }\n\n        .slider-row input[type=\"range\"] {\n            flex: 1;\n            height: 8px;\n            background: linear-gradient(90deg, rgba(78, 205, 196, 0.2) 0%, rgba(255, 107, 107, 0.2) 100%);\n            border-radius: 4px;\n            -webkit-appearance: none;\n            appearance: none;\n            position: relative;\n            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);\n        }\n\n        .slider-row input[type=\"range\"]::-webkit-slider-thumb {\n            -webkit-appearance: none;\n            appearance: none;\n            width: 22px;\n            height: 22px;\n            background: linear-gradient(135deg, #4ecdc4 0%, #00d4aa 100%);\n            border-radius: 50%;\n            cursor: pointer;\n            box-shadow: 0 0 15px rgba(78, 205, 196, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3);\n            transition: all 0.2s ease;\n            border: 2px solid rgba(255, 255, 255, 0.2);\n        }\n\n        .slider-row input[type=\"range\"]::-webkit-slider-thumb:hover {\n            transform: scale(1.15);\n            box-shadow: 0 0 25px rgba(78, 205, 196, 0.8), 0 4px 12px rgba(0, 0, 0, 0.4);\n        }\n\n        .slider-row input[type=\"range\"]::-moz-range-thumb {\n            width: 22px;\n            height: 22px;\n            background: linear-gradient(135deg, #4ecdc4 0%, #00d4aa 100%);\n            border-radius: 50%;\n            cursor: pointer;\n            box-shadow: 0 0 15px rgba(78, 205, 196, 0.6), 0 2px 8px rgba(0, 0, 0, 0.3);\n            border: 2px solid rgba(255, 255, 255, 0.2);\n        }\n\n        .slider-row .value {\n            width: 60px;\n            text-align: right;\n            color: #00d4aa;\n            font-family: 'Courier New', monospace;\n            font-size: 16px;\n            font-weight: bold;\n            text-shadow: 0 0 8px rgba(0, 212, 170, 0.5);\n        }\n\n        .apply-rotation-btn {\n            width: 100%;\n            padding: 12px;\n            margin-top: 15px;\n            border: 2px solid #00d4aa;\n            border-radius: 10px;\n            background: rgba(0, 212, 170, 0.08);\n            color: #00d4aa;\n            font-size: 14px;\n            font-weight: bold;\n            letter-spacing: 1px;\n            cursor: pointer;\n            transition: all 0.2s ease;\n            text-transform: uppercase;\n        }\n\n        .apply-rotation-btn:hover {\n            background: rgba(0, 212, 170, 0.2);\n        }\n\n        .apply-rotation-btn:active {\n            transform: scale(0.98);\n        }\n\n        /* Educational dropdown content */\n        .info-text {\n            line-height: 1.6;\n            color: #ccc;\n            text-align: left;\n        }\n\n        .info-text p {\n            margin: 10px 0;\n        }\n\n        .info-text ul {\n            margin: 10px 0;\n            padding-left: 20px;\n        }\n\n        .info-text li {\n            margin: 5px 0;\n        }\n\n        .info-text code {\n            background: #222;\n            padding: 2px 6px;\n            border-radius: 3px;\n            color: #00d4aa;\n        }\n\n        .gate-info-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n            gap: 15px;\n            margin-top: 20px;\n        }\n\n        .gate-info-card {\n            background: linear-gradient(135deg, rgba(30, 30, 45, 0.8) 0%, rgba(15, 15, 25, 0.9) 100%);\n            border: 1px solid rgba(78, 205, 196, 0.2);\n            border-radius: 12px;\n            padding: 16px;\n            transition: all 0.3s ease;\n            position: relative;\n            overflow: hidden;\n        }\n\n        .gate-info-card::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 2px;\n            background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.5), transparent);\n        }\n\n        .gate-info-card:hover {\n            transform: translateY(-3px);\n            border-color: rgba(78, 205, 196, 0.4);\n            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(78, 205, 196, 0.1);\n        }\n\n        .gate-info-card h5 {\n            margin: 0 0 10px 0;\n            color: #4ecdc4;\n            font-size: 15px;\n            text-shadow: 0 0 10px rgba(78, 205, 196, 0.3);\n        }\n\n        .gate-info-card p {\n            margin: 0;\n            font-size: 13px;\n            color: #aaa;\n            line-height: 1.5;\n        }\n\n        @media (max-width: 768px) {\n            #bloch-canvas-container {\n                width: 280px;\n                height: 280px;\n            }\n            \n            .controls-panel {\n                min-width: 100%;\n                max-width: 100%;\n            }\n\n            .gate-btn {\n                width: 44px;\n                height: 44px;\n                font-size: 16px;\n            }\n\n            .gate-section {\n                padding: 8px;\n                margin-bottom: 8px;\n            }\n\n            .gate-section h3 {\n                margin-bottom: 6px;\n                font-size: 10px;\n            }\n\n            .gate-buttons {\n                gap: 6px;\n            }\n\n            /* Compact layout: all gates in one row-based grid */\n            .controls-panel {\n                display: grid;\n                grid-template-columns: repeat(2, 1fr);\n                gap: 8px;\n            }\n\n            .state-display {\n                grid-column: 1 / -1;\n                height: auto;\n                min-height: 120px;\n                padding: 12px;\n                margin-top: 0;\n            }\n\n            .state-display h4 {\n                margin-bottom: 8px;\n            }\n\n            .state-line {\n                height: 28px;\n                font-size: 12px;\n                padding: 4px 8px;\n                margin: 4px 0;\n            }\n\n            .custom-rotation {\n                grid-column: 1 / -1;\n                padding: 10px;\n            }\n\n            .custom-rotation h3 {\n                font-size: 11px !important;\n                margin-bottom: 8px !important;\n            }\n\n            .slider-row {\n                margin-bottom: 6px;\n            }\n\n            .easter-egg-hint {\n                font-size: 9px;\n            }\n        }\n\n        /* Extra visual polish */\n        @keyframes glow-pulse {\n            0%, 100% { opacity: 0.6; }\n            50% { opacity: 1; }\n        }\n\n        .controls-panel {\n            animation: fadeIn 0.5s ease-out;\n        }\n\n        @keyframes fadeIn {\n            from { opacity: 0; transform: translateY(20px); }\n            to { opacity: 1; transform: translateY(0); }\n        }\n\n        /* Tooltip styling */\n        .gate-btn[title]:hover::after {\n            content: attr(title);\n            position: absolute;\n            bottom: 100%;\n            left: 50%;\n            transform: translateX(-50%);\n            background: rgba(0, 0, 0, 0.9);\n            color: #fff;\n            padding: 6px 10px;\n            border-radius: 6px;\n            font-size: 11px;\n            white-space: nowrap;\n            margin-bottom: 8px;\n            border: 1px solid rgba(255, 255, 255, 0.1);\n            z-index: 100;\n            font-weight: normal;\n        }\n    \n} }"
				}
			</style>
			<div className="simulation-controls">
				<button
					id="animation-toggle"
					type="button"
					onClick={(event) =>
						controller.current?.invoke?.("toggleAnimation", event.currentTarget)
					}
				>
					Animation pausieren
				</button>
			</div>
			<div>
				<h1>
					<br />
					{"Qubit Demonstration"}
				</h1>
			</div>
			<div className="bloch-container">
				<div id="bloch-canvas-container">
					<div className="canvas-hint" title="Drag to rotate · Scroll to zoom">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
							<path d="M12 8v8M8 12h8"></path>
							<path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2"></path>
						</svg>
					</div>
				</div>
				<div className="controls-panel">
					<div className="gate-section">
						<h3>{"Pauli Gates"}</h3>
						<div className="gate-buttons">
							<button
								disabled={!controller.ready}
								type="button"
								id="control-0"
								className="gate-btn pauli"
								data-action="applyGate"
								onClick={(event) => {
									controller.current?.invoke?.(
										"applyGate",
										event.currentTarget,
										"X",
									);
								}}
								title="Bit flip (rotation around X-axis)"
							>
								{"X"}
							</button>
							<button
								disabled={!controller.ready}
								type="button"
								id="control-1"
								className="gate-btn pauli"
								data-action="applyGate"
								onClick={(event) => {
									controller.current?.invoke?.(
										"applyGate",
										event.currentTarget,
										"Y",
									);
								}}
								title="Rotation around Y-axis"
							>
								{"Y"}
							</button>
							<button
								disabled={!controller.ready}
								type="button"
								id="control-2"
								className="gate-btn pauli"
								data-action="applyGate"
								onClick={(event) => {
									controller.current?.invoke?.(
										"applyGate",
										event.currentTarget,
										"Z",
									);
								}}
								title="Phase flip (rotation around Z-axis)"
							>
								{"Z"}
							</button>
						</div>
					</div>
					<div className="gate-section">
						<h3>{"Hadamard Gate"}</h3>
						<div className="gate-buttons">
							<button
								disabled={!controller.ready}
								type="button"
								id="control-3"
								className="gate-btn hadamard"
								data-action="applyGate"
								onClick={(event) => {
									controller.current?.invoke?.(
										"applyGate",
										event.currentTarget,
										"H",
									);
								}}
								title="Creates superposition"
							>
								{"H"}
							</button>
						</div>
					</div>
					<div className="gate-section">
						<h3>{"Phase Gates"}</h3>
						<div className="gate-buttons">
							<button
								disabled={!controller.ready}
								type="button"
								id="control-4"
								className="gate-btn phase"
								data-action="applyGate"
								onClick={(event) => {
									controller.current?.invoke?.(
										"applyGate",
										event.currentTarget,
										"S",
									);
								}}
								title="π/2 phase rotation"
							>
								{"S"}
							</button>
							<button
								disabled={!controller.ready}
								type="button"
								id="control-5"
								className="gate-btn phase"
								data-action="applyGate"
								onClick={(event) => {
									controller.current?.invoke?.(
										"applyGate",
										event.currentTarget,
										"T",
									);
								}}
								title="π/4 phase rotation"
							>
								{"T"}
							</button>
						</div>
					</div>
					<div className="gate-section">
						<h3>{"Actions"}</h3>
						<div className="gate-buttons">
							<button
								disabled={!controller.ready}
								type="button"
								id="control-6"
								className="gate-btn measure"
								data-action="measureQubit"
								onClick={(event) => {
									controller.current?.invoke?.(
										"measureQubit",
										event.currentTarget,
									);
								}}
								title="Collapse to |0⟩ or |1⟩"
							>
								{"Measure"}
							</button>
							<button
								disabled={!controller.ready}
								type="button"
								id="control-7"
								className="gate-btn reset"
								data-action="resetQubit"
								onClick={(event) => {
									controller.current?.invoke?.(
										"resetQubit",
										event.currentTarget,
									);
								}}
								title="Reset to |0⟩"
							>
								{"Reset"}
							</button>
						</div>
						<div
							style={{ display: "none" }}
							id="easter-egg-hint"
							className="easter-egg-hint"
						>
							{
								"\n                            ✨ Press H then Measure for a quantum surprise! But a bit of luck is required! ✨\n                        "
							}
						</div>
					</div>
					<div className="state-display" id="state-display">
						<div className="state-overlay" id="state-overlay">
							<div className="state-loading">
								<div className="quantum-spinner"></div>
								<span>{"Evolving..."}</span>
							</div>
						</div>
						<h4>{"Current State"}</h4>
						<div className="state-line state-psi" id="state-dirac">
							{"|ψ⟩ = |0⟩"}
						</div>
						<div className="state-line state-prob" id="state-prob">
							{"P(|0⟩) = 100%   P(|1⟩) = 0%"}
						</div>
						<div className="state-line state-coords" id="state-coords">
							{"θ = 0°   φ = 0°"}
						</div>
					</div>
					<div className="custom-rotation">
						<h3
							style={{
								color: "#00d4aa",
								fontSize: "14px",
								textTransform: "uppercase",
								letterSpacing: "1px",
							}}
						>
							{"Custom Rotation"}
						</h3>
						<div className="slider-row">
							<label>{"θ"}</label>
							<input
								disabled={!controller.ready}
								type="range"
								id="theta-slider"
								min="0"
								max="180"
								defaultValue="0"
								onInput={(event) => {
									controller.current?.invoke?.(
										"updateSliderDisplay",
										event.currentTarget,
									);
								}}
							/>
							<span className="value" id="theta-value">
								{"0°"}
							</span>
						</div>
						<div className="slider-row">
							<label>{"φ"}</label>
							<input
								disabled={!controller.ready}
								type="range"
								id="phi-slider"
								min="0"
								max="360"
								defaultValue="0"
								onInput={(event) => {
									controller.current?.invoke?.(
										"updateSliderDisplay",
										event.currentTarget,
									);
								}}
							/>
							<span className="value" id="phi-value">
								{"0°"}
							</span>
						</div>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-8"
							className="apply-rotation-btn"
							data-action="applyCustomRotation"
							onClick={(event) => {
								controller.current?.invoke?.(
									"applyCustomRotation",
									event.currentTarget,
								);
							}}
						>
							{"Set State"}
						</button>
					</div>
				</div>
			</div>
			<div className="dropdown-container">
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						aria-expanded="false"
						id="control-9"
						className="dropdown-header"
						data-action="toggleDropdown"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleDropdown",
								event.currentTarget,
								event.currentTarget,
							);
						}}
					>
						{"\n                        What is a Qubit? "}
						<span className="arrow">{"▼"}</span>
					</button>
					<div className="dropdown-content">
						<div className="info-text">
							<p>
								{"A "}
								<strong>{"qubit"}</strong>
								{
									" (quantum bit) is the fundamental unit of quantum information. Unlike classical bits that can only be 0 or 1, a qubit can exist in a "
								}
								<strong>{"superposition"}</strong>
								{" of both states simultaneously."}
							</p>
							<p>{"The general state of a qubit is written as:"}</p>
							<p
								style={{
									textAlign: "center",
									fontSize: "20px",
									color: "#4ecdc4",
								}}
							>
								{"\\[|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle\\]"}
							</p>
							<p>
								{
									"Where \\(\\alpha\\) and \\(\\beta\\) are complex numbers called "
								}
								<strong>{"probability amplitudes"}</strong>
								{", satisfying \\(|\\alpha|^2 + |\\beta|^2 = 1\\)."}
							</p>
							<p>{"On the Bloch sphere, any pure state can be written as:"}</p>
							<p
								style={{
									textAlign: "center",
									fontSize: "18px",
									color: "#ffe66d",
								}}
							>
								{
									"\\[|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\frac{\\theta}{2}|1\\rangle\\]"
								}
							</p>
							<p>
								{"The "}
								<strong>{"Bloch sphere"}</strong>
								{" is a geometric representation of a qubit's state:"}
							</p>
							<ul>
								<li>
									<strong>{"North pole"}</strong>
									{' \\(|0\\rangle\\): The classical "0" state'}
								</li>
								<li>
									<strong>{"South pole"}</strong>
									{' \\(|1\\rangle\\): The classical "1" state'}
								</li>
								<li>
									<strong>{"Equator"}</strong>
									{
										": Equal superposition states like \\(|+\\rangle\\) and \\(|-\\rangle\\)"
									}
								</li>
								<li>
									<strong>{"Any point on the surface"}</strong>
									{": A valid pure qubit state"}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="divider"></div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						aria-expanded="false"
						id="control-10"
						className="dropdown-header"
						data-action="toggleDropdown"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleDropdown",
								event.currentTarget,
								event.currentTarget,
							);
						}}
					>
						{"\n                        Quantum Gates Explained "}
						<span className="arrow">{"▼"}</span>
					</button>
					<div className="dropdown-content">
						<div className="info-text">
							<p>
								{
									"Quantum gates are operations that transform qubit states. On the Bloch sphere, they correspond to rotations."
								}
							</p>
							<div className="gate-info-grid">
								<div className="gate-info-card">
									<h5>{"X Gate (Pauli-X)"}</h5>
									<p>
										{"Bit flip gate. Rotates \\(\\pi\\) around X-axis."}
										<br />
										{
											"\\(|0\\rangle \\rightarrow |1\\rangle\\), \\(|1\\rangle \\rightarrow |0\\rangle\\)"
										}
									</p>
								</div>
								<div className="gate-info-card">
									<h5>{"Y Gate (Pauli-Y)"}</h5>
									<p>
										{"Rotates \\(\\pi\\) around Y-axis."}
										<br />
										{
											"\\(|0\\rangle \\rightarrow i|1\\rangle\\), \\(|1\\rangle \\rightarrow -i|0\\rangle\\)"
										}
									</p>
								</div>
								<div className="gate-info-card">
									<h5>{"Z Gate (Pauli-Z)"}</h5>
									<p>
										{"Phase flip gate. Rotates \\(\\pi\\) around Z-axis."}
										<br />
										{
											"\\(|0\\rangle \\rightarrow |0\\rangle\\), \\(|1\\rangle \\rightarrow -|1\\rangle\\)"
										}
									</p>
								</div>
								<div className="gate-info-card">
									<h5>{"H Gate (Hadamard)"}</h5>
									<p>
										{"Creates superposition."}
										<br />
										{
											"\\(|0\\rangle \\rightarrow |+\\rangle\\), \\(|1\\rangle \\rightarrow |-\\rangle\\)"
										}
									</p>
								</div>
								<div className="gate-info-card">
									<h5>{"S Gate (Phase)"}</h5>
									<p>
										{"Rotates \\(\\frac{\\pi}{2}\\) around Z-axis."}
										<br />
										{
											"\\(|1\\rangle \\rightarrow i|1\\rangle\\), also \\(\\sqrt{Z}\\)"
										}
									</p>
								</div>
								<div className="gate-info-card">
									<h5>{"T Gate"}</h5>
									<p>
										{"Rotates \\(\\frac{\\pi}{4}\\) around Z-axis."}
										<br />
										{"\\(|1\\rangle \\rightarrow e^{i\\pi/4}|1\\rangle\\)"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="divider"></div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						aria-expanded="false"
						id="control-11"
						className="dropdown-header"
						data-action="toggleDropdown"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleDropdown",
								event.currentTarget,
								event.currentTarget,
							);
						}}
					>
						{"\n                        Quantum Measurement "}
						<span className="arrow">{"▼"}</span>
					</button>
					<div className="dropdown-content">
						<div className="info-text">
							<p>
								{"When a qubit is "}
								<strong>{"measured"}</strong>
								{", its superposition state "}
								<strong>{"collapses"}</strong>
								{" to one of the basis states:"}
							</p>
							<ul>
								<li>
									{
										"Collapses to \\(|0\\rangle\\) with probability \\(|\\alpha|^2 = \\cos^2(\\theta/2)\\)"
									}
								</li>
								<li>
									{
										"Collapses to \\(|1\\rangle\\) with probability \\(|\\beta|^2 = \\sin^2(\\theta/2)\\)"
									}
								</li>
							</ul>
							<p>
								{
									"This is fundamentally probabilistic, you cannot predict which outcome will occur, only the probabilities. After measurement, the qubit is in the measured state."
								}
							</p>
							<p>
								{
									"On the Bloch sphere, measurement projects the state to either the north pole (\\(|0\\rangle\\)) or south pole (\\(|1\\rangle\\))."
								}
							</p>
						</div>
					</div>
				</div>
				<div className="divider"></div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						aria-expanded="false"
						id="control-12"
						className="dropdown-header"
						data-action="toggleDropdown"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleDropdown",
								event.currentTarget,
								event.currentTarget,
							);
						}}
					>
						{"\n                        References "}
						<span className="arrow">{"▼"}</span>
					</button>
					<div className="dropdown-content">
						<div className="info-text">
							<ul>
								<li>
									<a
										style={{ color: "#4ecdc4" }}
										href="https://en.wikipedia.org/wiki/Bloch_sphere"
										target="_blank"
									>
										{"Bloch Sphere - Wikipedia"}
									</a>
								</li>
								<li>
									<a
										style={{ color: "#4ecdc4" }}
										href="https://en.wikipedia.org/wiki/Qubit"
										target="_blank"
									>
										{"Qubit - Wikipedia"}
									</a>
								</li>
								<li>
									<a
										style={{ color: "#4ecdc4" }}
										href="https://quantum.country/qcvc"
										target="_blank"
									>
										{"Quantum Computing for the Very Curious"}
									</a>
								</li>
								<li>
									<a
										style={{ color: "#4ecdc4" }}
										href="https://www.quantum.amsterdam/"
										target="_blank"
									>
										{"Quantum Amsterdam"}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<br />
		</div>
	);
}
